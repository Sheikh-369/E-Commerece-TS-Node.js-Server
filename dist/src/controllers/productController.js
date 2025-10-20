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
const productModel_1 = __importDefault(require("../database/models/productModel"));
const categoryModel_1 = __importDefault(require("../database/models/categoryModel"));
const cartModel_1 = __importDefault(require("../database/models/cartModel"));
const sequelize_1 = require("sequelize");
class ProductController {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productName, productDescription, productPrice, oldPrice, productTotalStock, productDiscount, categoryId, isFeatured } = req.body;
            const productImage = req.file ? req.file.path : "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png";
            if (!productName || !productDescription || !productPrice || !productTotalStock || !categoryId) {
                res.status(400).json({
                    message: "Please provide all the information!"
                });
                return;
            }
            yield productModel_1.default.create({
                productName,
                productDescription,
                productPrice,
                oldPrice,
                productTotalStock,
                productDiscount: productDiscount || 0,
                categoryId,
                productImage,
                isFeatured: isFeatured || false
            });
            res.status(200).json({
                message: "Product Created Successfully"
            });
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { productName, productDescription, productPrice, oldPrice, productTotalStock, productDiscount, categoryId, isFeatured } = req.body;
            //dealing with image
            const existingProduct = yield productModel_1.default.findByPk(id);
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found." });
            }
            // Only replace image if a new one is uploaded
            const productImage = req.file ? req.file.path : existingProduct.productImage; //Fetch existing product
            if (!productName || !productDescription || !productPrice || !productTotalStock || !categoryId) {
                res.status(400).json({
                    message: "Please provide all the information!"
                });
                return;
            }
            yield productModel_1.default.update({
                productName,
                productDescription,
                productPrice,
                oldPrice,
                productTotalStock,
                productDiscount: productDiscount !== null && productDiscount !== void 0 ? productDiscount : null, //?? will set null if no discount is given
                categoryId,
                productImage,
                isFeatured: isFeatured || false
            }, { where: { id } });
            res.status(200).json({
                message: "Product Updated Successfully"
            });
        });
    }
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield productModel_1.default.findAll({
                include: [{
                        model: categoryModel_1.default,
                        attributes: ["categoryName"]
                    }]
            });
            res.status(200).json({
                message: "Products fetched successfully",
                data
            });
        });
    }
    static getByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryName } = req.params;
            const data = yield productModel_1.default.findAll({
                include: [
                    {
                        model: categoryModel_1.default,
                        where: {
                            categoryName: {
                                [sequelize_1.Op.iLike]: categoryName, // Case-insensitive match for PostgreSQL
                            },
                        },
                        attributes: ['categoryName'],
                    },
                ],
            });
            res.status(200).json({
                message: `${categoryName} products fetched successfully`,
                data,
            });
        });
    }
    static getFeaturedProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield productModel_1.default.findAll({
                where: {
                    isFeatured: true,
                },
            });
            res.status(200).json({
                message: "Featured products fetched successfully",
                data,
            });
        });
    }
    static getSingleProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield productModel_1.default.findOne({
                where: { id },
                include: [
                    {
                        model: categoryModel_1.default,
                        attributes: ["categoryName"],
                    },
                ],
            });
            if (!data) {
                return res.status(404).json({ message: "Product not found." });
            }
            res.status(200).json({
                message: "Single Product Fetched Successfully.",
                data,
            });
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield productModel_1.default.findOne({ where: { id } });
            if (!data) {
                return res.status(404).json({
                    message: "The product does not exist!"
                });
            }
            //Cart ma soft delete hunx
            yield cartModel_1.default.update({ deletedAt: new Date() }, { where: { productId: id } });
            yield productModel_1.default.destroy({ where: { id } });
            res.status(200).json({
                message: "Product Deleted Successfully.",
                data
            });
        });
    }
}
exports.default = ProductController;
