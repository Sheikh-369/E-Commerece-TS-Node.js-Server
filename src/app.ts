import express from "express"
const app=express()

import "./database/connection"
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import categoryRoute from "./routes/categoryRoute"

app.use(express.json())

app.use("/ecommerce/auth",userRoute)
app.use("/ecommerce",productRoute)
app.use("/ecommerce",categoryRoute)

export default app