import adminSeeder from "./src/adminSeeder";
import app from "./src/app";
import {config} from "dotenv"
import CategoryController from "./src/controllers/categoryController";
config()
import {Server} from "socket.io"
import jwt from "jsonwebtoken"
import User from "./src/database/models/userModel";
import Order from "./src/database/models/orderModel";

const  startServer=()=>{
    const port=process.env.PORT
    //giving server to web socket
    const server=app.listen(port,()=>{
        console.log(`Server has started at port ${port}.`)
        CategoryController.seedCategory()
        adminSeeder()
    })
    //connecting web socket and backend
    const io = new Server(server,{
        cors : {
            origin : 'http://localhost:3000'
        }
    })
    //collecting the online users
    let onlineUsers:{socketId:string,userId:string,role:string}[] = []
    //filtering duplication
    let addToOnlineUsers = (socketId:string,userId:string,role:string)=>{
        onlineUsers = onlineUsers.filter((user)=>user.userId !== userId) 
        onlineUsers.push({socketId,userId,role})
    }
    // authenticating the connecting user using JWT
    io.on("connection",(socket)=>{
        const {token} = socket.handshake.auth // jwt token 
        console.log(token,"TOKEN")
        if(token){
            jwt.verify(token as string,process.env.JWT_SECRET!, async (err:any,result:any)=>{
                if(err){
                    socket.emit("error",err)
                }else{
                     //{email:"",password:"",role:""}
                    const userData = await User.findByPk(result.userId)
                    if(!userData){
                       socket.emit("error","No user found with that token")
                        return
                    }
                    //need to grab the user ID and role from the token 
                    addToOnlineUsers(socket.id,result.userId,userData.role)
              
                }
               })
            }else{
                console.log("triggered")
                socket.emit("error","Please provide token")
            }

        // receiving updated order status from client    
        socket.on("updateOrderStatus",async (data)=>{
            const {status,orderId,userId} = data

            // finding the user who placed the order
            const findUser = onlineUsers.find(user=>user.userId == userId) // {socketId,userId, role}
            // updating order status in the database
            await Order.update(
                {
                    orderStatus : status
                },
               {
                 where : {
                    id : orderId
                }
               } 
            )
            // sending updated status to the user if online
            if(findUser){
                io.to(findUser.socketId).emit("statusUpdated",data)
            }else{
                // sending error if user is not connected
                socket.emit("error","User is not online!!")
            }
        })
    })

}

startServer()