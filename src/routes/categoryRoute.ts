import express, { Router } from "express"
import CategoryController from "../controllers/categoryController"
import Middleware from "../middleware/middleware"
import asyncErrorHandler from "../services/asyncErrorHandler"

const router:Router=express.Router()

router.route("/category").post(asyncErrorHandler(CategoryController.addCategory))
router.route("/category").get(CategoryController.fetchAllCategories)
router.route("/category/:id").get(CategoryController.fetchSingleCategory)
router.route("/category/:id").delete(asyncErrorHandler(CategoryController.deleteCategory))
router.route("/category/:id").patch(asyncErrorHandler(CategoryController.editCategory))

export default router
