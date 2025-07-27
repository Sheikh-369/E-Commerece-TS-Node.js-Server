import express, { Router } from "express"
import CategoryController from "../controllers/categoryController"
import Middleware from "../middleware/middleware"

const router:Router=express.Router()

router.route("/category").post(Middleware.isLoggedI,CategoryController.addCategory)
router.route("/category").get(CategoryController.fetchAllCategories)
router.route("/category/:id").get(CategoryController.fetchSingleCategory)
router.route("/category/:id").delete(Middleware.isLoggedI,CategoryController.deleteCategory)
router.route("/category/:id").patch(Middleware.isLoggedI,CategoryController.editCategory)

export default router
