import { Request, Response } from "express"
import Category from "../database/models/categoryModel"

class CategoryController{
    //categories to be seeded
    static categories=[
        {
            categoryName:"Clothing",
            categoryDescription:"Feel the luxury within you."
        },
        {
            categoryName:"Electronics",
            categoryDescription:"We built the safest technology for your comfortness."
        },
        {
            categoryName:"Groceries",
            categoryDescription:"You health matters, every grain is hand picked."
        },
        {
            categoryName:"Drinks",
            categoryDescription:"We value your thirst.Each drop has the feel of quich of heaven!"
        }
    ]

    //category seeding
    static async seedCategory(){
        const data=await Category.findAll()
        if(data.length===0){
            await Category.bulkCreate(this.categories)
            console.log("Category Seeded Successfully!")
        }else{
            console.log("Category Already Seeded!")
        }
        
    }

    //adding category
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


    //updating category
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

        const updatedCategory=await Category.findByPk(id)//updated category

        res.status(200).json({
            message:"Category Updated Successfully!",
            data:updatedCategory
        })
    }


    //fetching all categories
    static async fetchAllCategories(req:Request,res:Response){
        const data=await Category.findAll()
        res.status(200).json({
            message:"All Categories Fetched Successfully!",
            data
        })
    }


    //fetching single category
    static async fetchSingleCategory(req:Request,res:Response){
        const id=req.params.id
        const data=await Category.findByPk(id)
        res.status(200).json({
            message:"Single Category Fetched Successfully!",
            data
        })
    }


    //deleting category
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