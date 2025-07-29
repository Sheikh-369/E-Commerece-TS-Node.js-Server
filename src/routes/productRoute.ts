import express, { Router } from "express"
import ProductController from "../controllers/productController"
import Middleware, { Role } from "../middleware/middleware"
import upload from "../middleware/multerUpload"

const router:Router=express.Router()

router.route("/product").post(Middleware.isLoggedI,Middleware.accessTo(Role.Admin),upload.single("productImage"),ProductController.createProduct)

router.route("/product/:id").patch(Middleware.isLoggedI,Middleware.accessTo(Role.Admin),upload.single("productImage"),ProductController.updateProduct)

router.route("/product").get(ProductController.getAllProducts)

router.route("/product/:id").get(ProductController.getSingleProduct)

router.route("/product/:id").delete(Middleware.isLoggedI,Middleware.accessTo(Role.Admin),ProductController.deleteProduct)

export default router