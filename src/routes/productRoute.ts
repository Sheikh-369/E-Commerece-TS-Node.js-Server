import express, { Router } from "express"
import ProductController from "../controllers/productController"
import Middleware, { Role } from "../middleware/middleware"
import upload from "../middleware/multerUpload"
import asyncErrorHandler from "../services/asyncErrorHandler"

const router:Router=express.Router()

router.route("/product").post(
    upload.single("productImage"),
    asyncErrorHandler(ProductController.createProduct))

router.route("/product/:id").patch(
    upload.single("productImage"),
    asyncErrorHandler(ProductController.updateProduct))

router.route("/product").get(asyncErrorHandler(
    ProductController.getAllProducts))

router.route("/product/:id").get(asyncErrorHandler(
    ProductController.getSingleProduct))

router.route("/product/:id").delete(
    asyncErrorHandler(ProductController.deleteProduct))

export default router