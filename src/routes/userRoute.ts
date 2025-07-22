import express, { Router } from "express"
import UserControler from "../controllers/userController"

const router:Router=express.Router()

router.route("/register").post(UserControler.userRegister)
router.route("/login").post(UserControler.userLogin)
router.route("/forgot-password").post(UserControler.forgotPassword)
router.route("/reset-password").post(UserControler.resetPassword)


export default router