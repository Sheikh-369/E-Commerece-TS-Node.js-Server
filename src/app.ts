import express from "express"
const app=express()

import "./database/connection"
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import categoryRoute from "./routes/categoryRoute"
import orderRoute from "./routes/orderRoute"

app.use(express.json())

app.use("/ecommerce/auth",userRoute)
app.use("/ecommerce",productRoute)
app.use("/ecommerce",categoryRoute)
app.use("/ecommerce",orderRoute)

export default app