import express from "express"
const app=express()

import "./database/connection"
import userRoute from "./routes/userRoute"

app.use(express.json())

app.use("/ecommerce/user",userRoute)

export default app