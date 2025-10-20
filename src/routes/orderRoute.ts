import express, { Router } from "express"
import Middleware, { Role } from "../middleware/middleware"
import asyncErrorHandler from "../services/asyncErrorHandler"
import orderController from "../controllers/orderController"

const router:Router=express.Router()

router.route("/order").post(Middleware.isLoggedI,
    Middleware.accessTo(Role.Customer),
    asyncErrorHandler(orderController.createOrder)
)

//my orders
router.route("/my-orders").get(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Customer),
    asyncErrorHandler(orderController.getMyOrders)
)

//order by id
router.route("/my-orders/:id").get(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Customer),
    asyncErrorHandler(orderController.getOrderById)
)

router.route("/verify-transaction").post(Middleware.isLoggedI,
    Middleware.accessTo(Role.Customer),
    asyncErrorHandler(orderController.khaltiVerification)
)

export default router