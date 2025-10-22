import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetail";
import { OrderStatus, PaymentMethods, PaymentStatus } from "../Global/types";
import { khaltiPayment } from "../services/paymentIntegration";
import axios from "axios";
import Payment from "../database/models/paymentModel";
import Cart from "../database/models/cartModel";
import Product from "../database/models/productModel";

interface OrderRequest extends Request {
  user?: {
    id: string;
  };
}

interface IProduct {
  productId: string;
  orderQuantity: string;
}

class OrderController {
  //place and order
  async createOrder(req: OrderRequest, res: Response) {
    //tracking user from the user table
    const userId = req.user?.id;

    //validation
    const {firstName,lastName, phoneNumber,email, province,district,city,tole,totalAmount, paymentMethod } = req.body;
    const products: IProduct[] = req.body.products;

    if (!firstName || !lastName || !phoneNumber || !email || !province || !district || !city || !tole || !totalAmount || products.length === 0) {
      return res.status(400).json({
        message: "Please fill all the information!",
      });
    }

    // Creating Order table
    const orderData = await Order.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      province,
      district,
      city,
      tole,
      totalAmount,
      userId,
      // paymentId: paymentData.id,
    });

    // Creating Payment table
    const paymentData = await Payment.create({
      paymentMethod: paymentMethod,
      orderId:orderData.id
    });

    //including paymentId in order table
    orderData.paymentId = paymentData.id;
    await orderData.save();

    // Creating OrderDetails table
    for (const product of products) {
      await OrderDetail.create({
        productId: product.productId,
        orderId: orderData.id,
        orderQuantity: product.orderQuantity,
      });
    }

    // Get array of product IDs from the products array
  const productIds = products.map(product => product.productId);

  await Cart.destroy({
    where: {
      userId,
      productId: productIds,  // Sequelize will interpret this as IN clause
    },
  });

    
    // If Khalti is selected, initiate payment and save pidx
    if (paymentMethod === PaymentMethods.Khalti) {
      const response = await khaltiPayment({
        totalAmount: totalAmount,
        return_url: "http://localhost:3000/khalti-verify",//"http://localhost:3000/",
        website_url: "http://localhost:3000/",
        purchase_order_id: orderData.id,
        purchase_order_name: "Order_" + orderData.id,
      });

      if (response.status === 200) {
        paymentData.pidx = response.data.pidx;
        await paymentData.save();

        return res.status(200).json({
          message: "Khalti payment initiated successfully",
          data: response.data,
        });
      } else {
        return res.status(500).json({
          message: "Something went wrong with Khalti. Please try again.",
        });
      }
    }

    // For other payment methods (e.g. COD, Esewa)
    return res.status(200).json({
      message: "Order created successfully!",
    });
  }
//view orders
  async getMyOrders (req: OrderRequest, res: Response){
  const userId = req.user?.id;

  const orders = await Order.findAll({
    where: { userId },
    attributes: ["id", "totalAmount", "createdAt","orderStatus"],
    include: [
      {
        model: Payment,
        as: "payment",
        attributes: ["paymentStatus"]
      },
      {
        model: OrderDetail,
        as: "orderDetails",
        attributes: ["orderQuantity"],
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["productName", "productImage", "productPrice"]
          }
        ]
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  res.status(200).json({
    message: "Orders fetched successfully",
    data: orders
  });
};

//order details
async getOrderById(req: OrderRequest, res: Response) {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id },
    attributes: ["id", "totalAmount", "createdAt"],
    include: [
      {
        model: Payment,
        as: "payment",
        attributes: ["paymentStatus"]
      },
      {
        model: OrderDetail,
        as: "orderDetails",
        attributes: ["orderQuantity"],
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["productName", "productImage", "productPrice"]
          }
        ]
      }
    ]
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json({
    message: "Order fetched successfully",
    data: order
  });
}

//cancell order
async cancelOrder(req: OrderRequest, res: Response) {
  const userId = req.user?.id;
  const { id: orderId } = req.params;

  const order = await Order.findOne({
    where: { id: orderId, userId },
    include: [{ model: Payment, as: "payment" }]
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Only allow cancellation if order is Pending or Preparing
  const cancellableStatuses = [OrderStatus.Pending, OrderStatus.Preparing];

  if (!cancellableStatuses.includes(order.orderStatus as OrderStatus)) {
    return res.status(400).json({
      message: `Cannot cancel order in '${order.orderStatus}' status`
    });
  }

  // Cancel the order
  order.orderStatus = OrderStatus.Cancelled;
  await order.save();

  // No change to payment since it's either Paid or Pending (and no refunds yet)

  return res.status(200).json({
    message: "Order cancelled successfully"
  });
}

//cahnge order status
async updateOrderStatus(req: Request, res: Response) {
  const { id: orderId } = req.params;
  const { orderStatus } = req.body;

  // Validate input
  if (!orderStatus) {
    return res.status(400).json({ message: "Order status is required" });
  }

  // Optional: Validate allowed statuses
  const allowedStatuses = Object.values(OrderStatus);
  if (!allowedStatuses.includes(orderStatus)) {
    return res.status(400).json({ message: "Invalid order status value" });
  }

  const order = await Order.findByPk(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.orderStatus = orderStatus;
  await order.save();

  return res.status(200).json({ message: "Order status updated successfully" });
}

//delete an order
async deleteOrder(req: Request, res: Response) {
  const { id: orderId } = req.params;

  const order = await Order.findByPk(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Delete related OrderDetails
  await OrderDetail.destroy({ where: { orderId } });

  // Delete associated payment
  await Payment.destroy({ where: { orderId } });

  // Finally, delete the order
  await Order.destroy({ where: { id: orderId } });

  return res.status(200).json({ message: "Order deleted successfully" });
}

//khalti payment verification
  async khaltiVerification(req:OrderRequest,res:Response){
    const {pidx}=req.body
    if(!pidx){
      res.status(400).json({
        message:"Please Provide pidx!"
      })
      return
    }

    const response=await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{
      pidx:pidx
    },{
      headers:{
        Authorization:"Key d6b8b250e2024fb5b258a9beee2fa6c6"
      }
    })
    const data=response.data
    if(data.status==="Completed"){
      await Payment.update({
        paymentStatus:PaymentStatus.Paid
      },{
        where:{
          pidx:pidx
        }
      })
      res.status(200).json({
        message:"Payment Successful!"
      })
    }else{
      res.status(400).json({
        message:"Payment Failed or Cancelled!"
      })
    }

  }
}

export default new OrderController();
