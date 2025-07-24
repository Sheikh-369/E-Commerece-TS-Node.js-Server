import express from "express"
const app=express()

import "./database/connection"
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"

app.use(express.json())

app.use("/ecommerce/auth",userRoute)
app.use("/ecommerce",productRoute)

export default app