import express, { Router } from "express"
import ProductController from "../controllers/productController"
import Middleware, { Role } from "../middleware/middleware"
import upload from "../middleware/multerUpload"
import asyncErrorHandler from "../services/asyncErrorHandler"
import UserControler from "../controllers/userController"

const router:Router=express.Router()

router.route("/product").post(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Admin),
    upload.single("productImage"),
    asyncErrorHandler(ProductController.createProduct))

router.route("/product/:id").patch(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Admin),
    upload.single("productImage"),
    asyncErrorHandler(ProductController.updateProduct))

router.route("/product").get(asyncErrorHandler(
    ProductController.getAllProducts))

router.route("/product/category/:categoryName").get(
    asyncErrorHandler(ProductController.getByCategory));

router.route("/product/:id").get(asyncErrorHandler(
    ProductController.getSingleProduct))

router.route("/product/:id").delete(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Admin),
    asyncErrorHandler(ProductController.deleteProduct))

export default router