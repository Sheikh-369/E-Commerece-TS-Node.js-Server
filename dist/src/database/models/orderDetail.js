"use strict";
// import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
// import Order from "./orderModel";
// import Product from "./productModel";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @Table({
//   tableName: "orderDetails",
//   modelName: "OrderDetail",
//   timestamps: true
// })
// class OrderDetail extends Model {
//   @Column({
//     primaryKey: true,
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4
//   })
//   declare id: string;
//   @ForeignKey(() => Order)
//   @Column({
//     type: DataType.UUID,
//     allowNull: false
//   })
//   declare orderId: string;
//   @ForeignKey(() => Product)
//   @Column({
//     type: DataType.UUID,
//     allowNull: false
//   })
//   declare productId: string;
//   // @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
//   // declare product: Product;
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//   declare orderQuantity: number;
// }
// export default OrderDetail;
const sequelize_typescript_1 = require("sequelize-typescript");
const orderModel_1 = __importDefault(require("./orderModel"));
const productModel_1 = __importDefault(require("./productModel"));
let OrderDetail = class OrderDetail extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], OrderDetail.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => orderModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderDetail.prototype, "orderId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => productModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderDetail.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => productModel_1.default, { foreignKey: "productId", as: "product" }),
    __metadata("design:type", productModel_1.default)
], OrderDetail.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "orderQuantity", void 0);
OrderDetail = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "orderDetails",
        modelName: "OrderDetail",
        timestamps: true
    })
], OrderDetail);
exports.default = OrderDetail;
