import { Request, Response } from "express";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";
import Cart from "../database/models/cartModel";
import { Op } from 'sequelize';


class ProductController{
    static async createProduct(req:Request,res:Response){
        const {productName,productDescription,productPrice,oldPrice,productTotalStock,productDiscount,categoryId} = req.body
        
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
            oldPrice,
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
        const {productName,productDescription,productPrice,oldPrice,productTotalStock,productDiscount,categoryId} = req.body 
        
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
            oldPrice,
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
                attributes:["categoryName"]
            }]
        })
        res.status(200).json({
            message : "Products fetched successfully", 
            data
        })
    }

    static async getByCategory(req: Request, res: Response) {
        const { categoryName } = req.params;

        const data = await Product.findAll({
            include: [
            {
                model: Category,
                where: {
                categoryName: {
                    [Op.iLike]: categoryName, // Case-insensitive match for PostgreSQL
                },
                },
                attributes: ['categoryName'],
            },
            ],
    });

    res.status(200).json({
        message: `${categoryName} products fetched successfully`,
        data,
    });
    }

    static async getSingleProduct(req: Request, res: Response) {
    const id = req.params.id;
    const data = await Product.findOne({
        where: { id },
        include: [
        {
            model: Category,
            attributes: ["categoryName"],
        },
        ],
    });

    if (!data) {
        return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
        message: "Single Product Fetched Successfully.",
        data,
    });
    }

    static async deleteProduct(req: Request, res: Response) {
        const id = req.params.id;
        const data = await Product.findOne({ where: { id } });

        if (!data) {
            return res.status(404).json({
            message: "The product does not exist!"
            });
        }

        //Cart ma soft delete hunx
        await Cart.update({ deletedAt: new Date() }, { where: { productId: id } });


        await Product.destroy({ where: { id } });
        
        res.status(200).json({
            message: "Product Deleted Successfully.",
            data
        });
    }

}

export default  ProductController