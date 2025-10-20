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
const orderModel_1 = __importDefault(require("../database/models/orderModel"));
const orderDetail_1 = __importDefault(require("../database/models/orderDetail"));
const types_1 = require("../Global/types");
const paymentIntegration_1 = require("../services/paymentIntegration");
const axios_1 = __importDefault(require("axios"));
const paymentModel_1 = __importDefault(require("../database/models/paymentModel"));
const cartModel_1 = __importDefault(require("../database/models/cartModel"));
const productModel_1 = __importDefault(require("../database/models/productModel"));
class OrderController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            //tracking user from the user table
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            //validation
            const { firstName, lastName, phoneNumber, email, province, district, city, tole, totalAmount, paymentMethod } = req.body;
            const products = req.body.products;
            if (!firstName || !lastName || !phoneNumber || !email || !province || !district || !city || !tole || !totalAmount || products.length === 0) {
                return res.status(400).json({
                    message: "Please fill all the information!",
                });
            }
            // Creating Order table
            const orderData = yield orderModel_1.default.create({
                firstName,
                lastName,
                phoneNumber,
                email,
                province,
                district,
                city,
                tole,
                totalAmount,
                userId,
                // paymentId: paymentData.id,
            });
            // Creating Payment table
            const paymentData = yield paymentModel_1.default.create({
                paymentMethod: paymentMethod,
                orderId: orderData.id
            });
            //including paymentId in order table
            orderData.paymentId = paymentData.id;
            yield orderData.save();
            // Creating OrderDetails table
            for (const product of products) {
                yield orderDetail_1.default.create({
                    productId: product.productId,
                    orderId: orderData.id,
                    orderQuantity: product.orderQuantity,
                });
            }
            // Get array of product IDs from the products array
            const productIds = products.map(product => product.productId);
            yield cartModel_1.default.destroy({
                where: {
                    userId,
                    productId: productIds, // Sequelize will interpret this as IN clause
                },
            });
            // If Khalti is selected, initiate payment and save pidx
            if (paymentMethod === types_1.PaymentMethods.Khalti) {
                const response = yield (0, paymentIntegration_1.khaltiPayment)({
                    totalAmount: totalAmount,
                    return_url: "http://localhost:3000/khalti-verify", //"http://localhost:3000/",
                    website_url: "http://localhost:3000/",
                    purchase_order_id: orderData.id,
                    purchase_order_name: "Order_" + orderData.id,
                });
                if (response.status === 200) {
                    paymentData.pidx = response.data.pidx;
                    yield paymentData.save();
                    return res.status(200).json({
                        message: "Khalti payment initiated successfully",
                        data: response.data,
                    });
                }
                else {
                    return res.status(500).json({
                        message: "Something went wrong with Khalti. Please try again.",
                    });
                }
            }
            // For other payment methods (e.g. COD, Esewa)
            return res.status(200).json({
                message: "Order created successfully!",
            });
        });
    }
    getMyOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const orders = yield orderModel_1.default.findAll({
                where: { userId },
                attributes: ["id", "totalAmount", "createdAt"],
                include: [
                    {
                        model: paymentModel_1.default,
                        as: "payment",
                        attributes: ["paymentStatus"]
                    },
                    {
                        model: orderDetail_1.default,
                        as: "orderDetails",
                        attributes: ["orderQuantity"],
                        include: [
                            {
                                model: productModel_1.default,
                                as: "product",
                                attributes: ["productName", "productImage", "productPrice"]
                            }
                        ]
                    }
                ],
                order: [["createdAt", "DESC"]]
            });
            res.status(200).json({
                message: "Orders fetched successfully",
                data: orders
            });
        });
    }
    ;
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield orderModel_1.default.findOne({
                where: { id },
                attributes: ["id", "totalAmount", "createdAt"],
                include: [
                    {
                        model: paymentModel_1.default,
                        as: "payment",
                        attributes: ["paymentStatus"]
                    },
                    {
                        model: orderDetail_1.default,
                        as: "orderDetails",
                        attributes: ["orderQuantity"],
                        include: [
                            {
                                model: productModel_1.default,
                                as: "product",
                                attributes: ["productName", "productImage", "productPrice"]
                            }
                        ]
                    }
                ]
            });
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({
                message: "Order fetched successfully",
                data: order
            });
        });
    }
    khaltiVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pidx } = req.body;
            if (!pidx) {
                res.status(400).json({
                    message: "Please Provide pidx!"
                });
                return;
            }
            const response = yield axios_1.default.post("https://a.khalti.com/api/v2/epayment/lookup/", {
                pidx: pidx
            }, {
                headers: {
                    Authorization: "Key d6b8b250e2024fb5b258a9beee2fa6c6"
                }
            });
            const data = response.data;
            if (data.status === "Completed") {
                yield paymentModel_1.default.update({
                    paymentStatus: types_1.PaymentStatus.Paid
                }, {
                    where: {
                        pidx: pidx
                    }
                });
                res.status(200).json({
                    message: "Payment Successful!"
                });
            }
            else {
                res.status(400).json({
                    message: "Payment Failed or Cancelled!"
                });
            }
        });
    }
}
exports.default = new OrderController();
