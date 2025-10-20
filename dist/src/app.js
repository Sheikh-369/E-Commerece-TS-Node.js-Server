"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
require("./database/connection");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000"
}));
//auth
app.use("/ecommerce/auth", userRoute_1.default);
//product
app.use("/ecommerce", productRoute_1.default);
//category
app.use("/ecommerce", categoryRoute_1.default);
//order
app.use("/ecommerce", orderRoute_1.default);
//cart
app.use("/ecommerce", cartRoute_1.default);
exports.default = app;
