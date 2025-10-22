import express, { Router } from "express"
import Middleware, { Role } from "../middleware/middleware"
import asyncErrorHandler from "../services/asyncErrorHandler"
import orderController from "../controllers/orderController"

const router:Router=express.Router()
//place an order
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

//cancell order
router.route("/order/:id/cancel").patch(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Customer),
    asyncErrorHandler(orderController.cancelOrder)
)

//change order status
router.route("/order/:id/status").patch(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Admin),
    asyncErrorHandler(orderController.updateOrderStatus)
)

//delete an order
router.route("/order/:id").delete(
    Middleware.isLoggedI,
    Middleware.accessTo(Role.Admin),
    asyncErrorHandler(orderController.deleteOrder)
)

router.route("/verify-transaction").post(Middleware.isLoggedI,
    Middleware.accessTo(Role.Customer),
    asyncErrorHandler(orderController.khaltiVerification)
)

export default router