import { Request, Response } from "express";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";


class ProductController{
    static async createProduct(req:Request,res:Response){
        const {productName,productDescription,productPrice,productTotalStock,productDiscount,categoryId} = req.body
        
        const productImage=req.file?req.file.path : "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
        
        if(!productName || !productDescription || !productPrice || !productTotalStock || !categoryId){
            res.status(400).json({
                message : "Please provide all the information!"
            })
            return
        }
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStock,
            productDiscount:productDiscount || 0,
            categoryId,
            productImage
        })
        res.status(200).json({
            message : "Product Created Successfully"
        })
  
    }

    static async updateProduct(req:Request,res:Response){
        const id=req.params.id
        const {productName,productDescription,productPrice,productTotalStock,productDiscount,categoryId} = req.body 
        
        const productImage=req.file?req.file.path : "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"

        if(!productName || !productDescription || !productPrice || !productTotalStock || !categoryId){
            res.status(400).json({
                message : "Please provide all the information!"
            })
            return
        }
        await Product.update({
            productName,
            productDescription,
            productPrice,
            productTotalStock,
            productDiscount : productDiscount ?? null,//?? will set null if no discount is given
            categoryId,
            productImage
        },{where:{id}})
        res.status(200).json({
            message : "Product Updated Successfully"
        })
  
    }

    static async getAllProducts(req:Request,res:Response){
        const data= await Product.findAll({
            include:[{
                model:Category,
                attributes:["id","categoryName"]
            }]
        })
        res.status(200).json({
            message : "Products fetched successfully", 
            data
        })
    }

    static async getSingleProduct(req:Request,res:Response){
        const id = req.params.id
        const data=await Product.findAll({
            where:{
                id
            },
            include:[
                {
                    model:Category,
                    attributes:["id","categoryName"]
                }
            ]
        })
        res.status(200).json({
            message : "Single Product Fetched Successfully", 
            data
        })
    }

    static async deleteProduct(req:Request,res:Response){
        const id=req.params.id
        const data = await Product.findAll({
            where : {id}
        })
        if(data.length === 0){
            res.status(404).json({
                message : "The product does not exists!"
            })
        }else{
            await Product.destroy({
                where : {id}
            })
            res.status(200).json({
                message : "Product Deleted Successfully", 
                data
            })
        }
    }
}

export default  ProductController