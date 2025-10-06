import express, { Router } from "express"
import asyncErrorHandler from "../services/asyncErrorHandler"
import { addToCart, deleteCartItem, showCartItems, updateCartItemQuantity } from "../controllers/cartController"
import Middleware, { Role } from "../middleware/middleware"

const router:Router=express.Router()

router.route("/cart").post(
    // Middleware.isLoggedI,
    // Middleware.accessTo(Role.Customer),
    asyncErrorHandler(addToCart))

router.route("/cart").get(
    // Middleware.isLoggedI,
    // Middleware.accessTo(Role.Customer),
    asyncErrorHandler(showCartItems)
)

router.route("/cart/:cartItemId").delete(
    // Middleware.isLoggedI,
    // Middleware.accessTo(Role.Customer),
    asyncErrorHandler(deleteCartItem)
)

router.route("/cart/:cartItemId").patch(
    // Middleware.isLoggedI,
    // Middleware.accessTo(Role.Customer),
    asyncErrorHandler(updateCartItemQuantity)
)

export default router