import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import PaymentMethod from "../database/models/paymentModel";
import OrderDetail from "../database/models/orderDetail";

interface OrderRequest extends Request{
    user?:{
        id:string
    }
}

interface IProduct{
    productId:string,
    orderQuantity:string
}

class OrderController{
    async createOrder(req:OrderRequest,res:Response){
        const userId=req.user?.id

        //taking data from frontend
        const {phoneNumber,shippingAddress,totalAmount,paymentMethod}=req.body

        //user can purchase many items(so it's an array)
        const products:IProduct[]=req.body.products

        if(!phoneNumber || !shippingAddress || !totalAmount || products.length===0){
            res.status(400).json({
                message:"Please fill all the information!"
            })
            return
        }

        //logic to insert data into paymentMethods table
        const paymentData = await PaymentMethod.create({
          paymentMethod : paymentMethod, 
        })

        //logic to insert data into orders table
        const orderData=await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId,
            paymentId:paymentData.id
        })

        //logic to insert into order datails table
        products.forEach(async function(product){
            await OrderDetail.create({
                productId:product.productId,
                oerderId:orderData.id,
                orderQuantity:product.orderQuantity
            })
        })
        res.status(200).json({
            message:"Order Created Successfully!"
        })


    }
}

export default new OrderController()