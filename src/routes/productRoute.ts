import express, { Router } from "express"
import ProductController from "../controllers/productController"

const router:Router=express.Router()

router.route("/product").post(ProductController.createProduct)
router.route("/product/:id").patch(ProductController.updateProduct)
router.route("/product").get(ProductController.getAllProducts)
router.route("/product/:id").get(ProductController.getSingleProduct)
router.route("/product/:id").delete(ProductController.deleteProduct)

export default router