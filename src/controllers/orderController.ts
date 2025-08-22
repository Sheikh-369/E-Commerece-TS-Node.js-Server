import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import PaymentMethod from "../database/models/paymentModel";
import OrderDetail from "../database/models/orderDetail";
import { PaymentMethods } from "../Global/types";
import { khaltiPayment } from "../services/paymentIntegration";

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
  async createOrder(req: OrderRequest, res: Response) {
    const userId = req.user?.id;

    const { phoneNumber, shippingAddress, totalAmount, paymentMethod } = req.body;
    const products: IProduct[] = req.body.products;

    if (!phoneNumber || !shippingAddress || !totalAmount || products.length === 0) {
      return res.status(400).json({
        message: "Please fill all the information!",
      });
    }

    // Create PaymentMethod
    const paymentData = await PaymentMethod.create({
      paymentMethod: paymentMethod,
    });

    // Create Order
    const orderData = await Order.create({
      phoneNumber,
      shippingAddress,
      totalAmount,
      userId,
      paymentId: paymentData.id,
    });

    // Create OrderDetails
    for (const product of products) {
      await OrderDetail.create({
        productId: product.productId,
        orderId: orderData.id,
        orderQuantity: product.orderQuantity,
      });
    }

    // If Khalti is selected, initiate payment and save pidx
    if (paymentMethod === PaymentMethods.Khalti) {
      const response = await khaltiPayment({
        totalAmount: totalAmount,
        return_url: "http://localhost:3000/",
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
}

export default new OrderController();
