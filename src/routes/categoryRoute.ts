import express, { Router } from "express"
import CategoryController from "../controllers/categoryController"

const router:Router=express.Router()

router.route("/category").post(CategoryController.addCategory)
router.route("/category").get(CategoryController.fetchAllCategories)
router.route("/category/:id").get(CategoryController.fetchSingleCategory)
router.route("/category/:id").delete(CategoryController.deleteCategory)
router.route("/category/:id").patch(CategoryController.editCategory)

export default router
