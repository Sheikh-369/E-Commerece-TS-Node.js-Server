import adminSeeder from "./src/adminSeeder";
import app from "./src/app";
import {config} from "dotenv"
import CategoryController from "./src/controllers/categoryController";
config()

const  startServer=()=>{
    const port=process.env.PORT
    app.listen(port,()=>{
        console.log(`Server has started at port ${port}.`)
        CategoryController.seedCategory()
        adminSeeder()
    })
}

startServer()