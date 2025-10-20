"use strict";
// import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
// import { PaymentMethods, PaymentStatus } from "../../Global/types";
// import Order from "./orderModel";
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
//   tableName: "payments",
//   modelName: "Payment",
//   timestamps: true
// })
// class Payment extends Model {
//   @Column({
//     primaryKey: true,
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4
//   })
//   declare id: string;
//   @Column({
//     type: DataType.ENUM(PaymentMethods.COD, PaymentMethods.Esewa, PaymentMethods.Khalti),
//     defaultValue: PaymentMethods.COD
//   })
//   declare paymentMethod: string;
//   @Column({
//     type: DataType.ENUM(PaymentStatus.Paid, PaymentStatus.Pending),
//     defaultValue: PaymentStatus.Pending
//   })
//   declare paymentStatus: string;
//   @Column({
//     type: DataType.STRING
//   })
//   declare pidx: string;
//   @ForeignKey(() => Order)
//   @Column({
//     type: DataType.UUID,
//     allowNull: false
//   })
//   declare orderId: string;
// }
// export default Payment;
const sequelize_typescript_1 = require("sequelize-typescript");
const types_1 = require("../../Global/types");
const orderModel_1 = __importDefault(require("./orderModel"));
let Payment = class Payment extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(types_1.PaymentMethods.COD, types_1.PaymentMethods.Esewa, types_1.PaymentMethods.Khalti),
        defaultValue: types_1.PaymentMethods.COD
    }),
    __metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(types_1.PaymentStatus.Paid, types_1.PaymentStatus.Pending),
        defaultValue: types_1.PaymentStatus.Pending
    }),
    __metadata("design:type", String)
], Payment.prototype, "paymentStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Payment.prototype, "pidx", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => orderModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false
    }),
    __metadata("design:type", String)
], Payment.prototype, "orderId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => orderModel_1.default, { foreignKey: "orderId", as: "order" }),
    __metadata("design:type", orderModel_1.default)
], Payment.prototype, "order", void 0);
Payment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "payments",
        modelName: "Payment",
        timestamps: true
    })
], Payment);
exports.default = Payment;
