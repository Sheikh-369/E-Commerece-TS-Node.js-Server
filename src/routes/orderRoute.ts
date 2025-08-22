import express, { Router } from "express"
import Middleware, { Role } from "../middleware/middleware"
import asyncErrorHandler from "../services/asyncErrorHandler"
import orderController from "../controllers/orderController"

const router:Router=express.Router()

router.route("/order").post(Middleware.isLoggedI,
    Middleware.accessTo(Role.Customer),
    asyncErrorHandler(orderController.createOrder)
)

export default router