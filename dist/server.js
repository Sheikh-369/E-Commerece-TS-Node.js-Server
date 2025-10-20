"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminSeeder_1 = __importDefault(require("./src/adminSeeder"));
const app_1 = __importDefault(require("./src/app"));
const dotenv_1 = require("dotenv");
const categoryController_1 = __importDefault(require("./src/controllers/categoryController"));
(0, dotenv_1.config)();
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("./src/database/models/userModel"));
const orderModel_1 = __importDefault(require("./src/database/models/orderModel"));
const startServer = () => {
    const port = process.env.PORT;
    //giving server to web socket
    const server = app_1.default.listen(port, () => {
        console.log(`Server has started at port ${port}.`);
        categoryController_1.default.seedCategory();
        (0, adminSeeder_1.default)();
    });
    //connecting web socket and backend
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:3000'
        }
    });
    //collecting the online users
    let onlineUsers = [];
    //filtering duplication
    let addToOnlineUsers = (socketId, userId, role) => {
        onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
        onlineUsers.push({ socketId, userId, role });
    };
    // authenticating the connecting user using JWT
    io.on("connection", (socket) => {
        const { token } = socket.handshake.auth; // jwt token 
        console.log(token, "TOKEN");
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    socket.emit("error", err);
                }
                else {
                    //{email:"",password:"",role:""}
                    const userData = yield userModel_1.default.findByPk(result.userId);
                    if (!userData) {
                        socket.emit("error", "No user found with that token");
                        return;
                    }
                    //need to grab the user ID and role from the token 
                    addToOnlineUsers(socket.id, result.userId, userData.role);
                }
            }));
        }
        else {
            console.log("triggered");
            socket.emit("error", "Please provide token");
        }
        // receiving updated order status from client    
        socket.on("updateOrderStatus", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { status, orderId, userId } = data;
            // finding the user who placed the order
            const findUser = onlineUsers.find(user => user.userId == userId); // {socketId,userId, role}
            // updating order status in the database
            yield orderModel_1.default.update({
                orderStatus: status
            }, {
                where: {
                    id: orderId
                }
            });
            // sending updated status to the user if online
            if (findUser) {
                io.to(findUser.socketId).emit("statusUpdated", data);
            }
            else {
                // sending error if user is not connected
                socket.emit("error", "User is not online!!");
            }
        }));
    });
};
startServer();
