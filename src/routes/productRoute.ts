import express, { Router } from "express"
import ProductController from "../controllers/productController"
import Middleware from "../middleware/middleware"

const router:Router=express.Router()

router.route("/product").post(Middleware.isLoggedI,ProductController.createProduct)
router.route("/product/:id").patch(Middleware.isLoggedI,ProductController.updateProduct)
router.route("/product").get(ProductController.getAllProducts)
router.route("/product/:id").get(ProductController.getSingleProduct)
router.route("/product/:id").delete(Middleware.isLoggedI,ProductController.deleteProduct)

export default router