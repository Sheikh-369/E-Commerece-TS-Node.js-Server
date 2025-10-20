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
exports.updateCartItemQuantity = exports.deleteCartItem = exports.showCartItems = exports.addToCart = void 0;
const cartModel_1 = __importDefault(require("../database/models/cartModel"));
const productModel_1 = __importDefault(require("../database/models/productModel"));
//user id for temporary testing  || "10ffae5c-776b-4809-b9ca-357f7ee91d9c"//only for testing
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        res.status(400).json({
            message: "Please provide product id and quantity."
        });
        return;
    }
    const itemAlreadyExist = yield cartModel_1.default.findOne({
        where: {
            userId, productId
        }
    });
    if (itemAlreadyExist) {
        itemAlreadyExist.quantity += quantity;
        yield itemAlreadyExist.save();
    }
    else {
        yield cartModel_1.default.create({
            userId,
            productId,
            quantity
        });
    }
    res.status(200).json({
        message: "Item added to cart successfully."
    });
});
exports.addToCart = addToCart;
const showCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const cartItems = yield cartModel_1.default.findAll({
        where: {
            userId
        },
        include: {
            model: productModel_1.default,
            attributes: ["productName", "productPrice", "productDescription", "productImage"]
        }
    });
    if (cartItems.length === 0) {
        res.status(200).json({
            message: "No items in your cart.",
            data: []
        });
    }
    else {
        res.status(200).json({
            message: "Cart items fetched successfully.",
            data: cartItems
        });
    }
});
exports.showCartItems = showCartItems;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const cartItemId = req.params.cartItemId;
    const cartItem = yield cartModel_1.default.findOne({
        where: { id: cartItemId, userId },
    });
    if (!cartItem) {
        return res.status(400).json({ message: "Cart item not found." });
    }
    yield cartModel_1.default.destroy({ where: { id: cartItemId, userId } });
    res.status(200).json({ message: "Item deleted successfully." });
});
exports.deleteCartItem = deleteCartItem;
const updateCartItemQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;
    if (quantity === undefined) {
        return res.status(400).json({
            message: "Please provide quantity"
        });
    }
    const cartItem = yield cartModel_1.default.findOne({
        where: {
            userId,
            id: cartItemId
        }
    });
    if (!cartItem) {
        return res.status(404).json({
            message: "The item does not exist."
        });
    }
    cartItem.quantity = quantity;
    yield cartItem.save();
    return res.status(200).json({
        message: "Cart updated!!"
    });
});
exports.updateCartItemQuantity = updateCartItemQuantity;
