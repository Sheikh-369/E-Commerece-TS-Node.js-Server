import express from "express"
const app=express()

import "./database/connection"

import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import categoryRoute from "./routes/categoryRoute"
import orderRoute from "./routes/orderRoute"
import cartRoute from "./routes/cartRoute"

app.use(express.json())
//auth
app.use("/ecommerce/auth",userRoute)
//product
app.use("/ecommerce",productRoute)
//category
app.use("/ecommerce",categoryRoute)
//order
app.use("/ecommerce",orderRoute)
//cart
app.use("/ecommerce",cartRoute)

export default app