import { Request, Response } from "express"
import Category from "../database/models/categoryModel"

class CategoryController{
    static categories=[
        {
            categoryName:"Clothing"
        },
        {
            categoryName:"Electronics"
        },
        {
            categoryName:"Groceries"
        },
        {
            categoryName:"Drinks"
        }
    ]

    static async seedCategory(){
        const data=await Category.findAll()
        if(data.length===0){
            await Category.bulkCreate(this.categories)
            console.log("Category Seeded Successfully!")
        }else{
            console.log("Category Already Seeded!")
        }
        
    }

    static async addCategory(req:Request,res:Response){
        const {categoryName}=req.body
        if(!categoryName){
            res.status(400).json({
                message:"Please fill the field!"
            })
            return
        }

        const data=await Category.create({
            categoryName
        })

        res.status(200).json({
            message:"Category Created Successfully!",
            data
        })
    }

    static async editCategory(req:Request,res:Response){
        const id=req.params.id
        const {categoryName}=req.body
        if(!categoryName){
            res.status(400).json({
                message:"Please fill the field!"
            })
            return
        }

        const data=await Category.update({
            categoryName
        },{where:{id}})

        res.status(200).json({
            message:"Category Updated Successfully!",
            data
        })
    }


    static async fetchAllCategories(req:Request,res:Response){
        const data=await Category.findAll()
        res.status(200).json({
            message:"All Categories Fetched Successfully!",
            data
        })
    }


    static async fetchSingleCategory(req:Request,res:Response){
        const id=req.params.id
        const data=await Category.findByPk(id)
        res.status(200).json({
            message:"Single Category Fetched Successfully!",
            data
        })
    }


    
    static async deleteCategory(req:Request,res:Response){
        const id = req.params.id 
        
        const data = await Category.findAll({
            where : {
                id : id
            }
        }) 

        if(data.length === 0){
            res.status(404).json({
                message : "No Category With That id!"
            })
        }else{
            await Category.destroy({
                where : {
                    id 
                }
            })
            res.status(200).json({
                message : "Category Deleted Successfully"
            })
        }
    }


}

export default CategoryController