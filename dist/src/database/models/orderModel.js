"use strict";
// import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
// import { OrderStatus } from "../../Global/types";
// import User from "./userModel";
// import Payment from "./paymentModel";
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
//   tableName: "orders",
//   modelName: "Order",
//   timestamps: true
// })
// class Order extends Model {
//   @Column({
//     primaryKey: true,
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4
//   })
//   declare id: string;
//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.UUID,
//     allowNull: false
//   })
//   declare userId: string;
//   @ForeignKey(() => Payment)
//   @Column({
//     type: DataType.UUID,
//     allowNull: true
//   })
//   declare paymentId: string;
//   // @BelongsTo(() => Payment, { foreignKey: "paymentId", as: "payment" })
//   // declare payment: Payment;
//   @Column({
//     type:DataType.STRING,
//     allowNull:false
//   })
//   declare firstName:string
//     @Column({
//     type:DataType.STRING,
//     allowNull:false
//   })
//   declare lastName:string
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [10, 10],
//         msg: "Phone number must be of 10 digits."
//       }
//     }
//   })
//   declare phoneNumber: string;
//   @Column({
//     type:DataType.STRING,
//     allowNull:false
//   })
//   declare email:string
//   @Column({
//     type: DataType.STRING,
//     allowNull: false
//   })
//   declare province: string;
//   @Column({
//     type: DataType.STRING,
//     allowNull: false
//   })
//   declare district: string;
//   @Column({
//     type: DataType.STRING,
//     allowNull: false
//   })
//   declare city: string;
//   @Column({
//     type: DataType.STRING,
//     allowNull: false
//   })
//   declare tole: string;
//   @Column({
//     type: DataType.FLOAT,
//     allowNull: false
//   })
//   declare totalAmount: number;
//   @Column({
//     type: DataType.ENUM(
//       OrderStatus.Cancelled,
//       OrderStatus.Delivered,
//       OrderStatus.OntheWay,
//       OrderStatus.Pending,
//       OrderStatus.Preparing
//     ),
//     defaultValue: OrderStatus.Pending
//   })
//   declare orderStatus: string;
// }
// export default Order;
const sequelize_typescript_1 = require("sequelize-typescript");
const types_1 = require("../../Global/types");
const userModel_1 = __importDefault(require("./userModel"));
const paymentModel_1 = __importDefault(require("./paymentModel"));
const orderDetail_1 = __importDefault(require("./orderDetail"));
let Order = class Order extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => userModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false
    }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => paymentModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => paymentModel_1.default, { foreignKey: "paymentId", as: "payment" }),
    __metadata("design:type", paymentModel_1.default)
], Order.prototype, "payment", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => orderDetail_1.default, { foreignKey: "orderId", as: "orderDetails" }),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 10],
                msg: "Phone number must be of 10 digits."
            }
        }
    }),
    __metadata("design:type", String)
], Order.prototype, "phoneNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "province", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "district", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "tole", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(types_1.OrderStatus.Cancelled, types_1.OrderStatus.Delivered, types_1.OrderStatus.OntheWay, types_1.OrderStatus.Pending, types_1.OrderStatus.Preparing),
        defaultValue: types_1.OrderStatus.Pending
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
Order = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "orders",
        modelName: "Order",
        timestamps: true,
    })
], Order);
exports.default = Order;
