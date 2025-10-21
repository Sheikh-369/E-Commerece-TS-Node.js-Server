import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import { OrderStatus } from "../../Global/types";
import User from "./userModel";
import Payment from "./paymentModel";
import OrderDetail from "./orderDetail";

@Table({
  tableName: "orders",
  modelName: "Order",
  timestamps: true,
})
class Order extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare userId: string;

  @ForeignKey(() => Payment)
  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  declare paymentId: string;

  @BelongsTo(() => Payment, { foreignKey: "paymentId", as: "payment" })
  declare payment: Payment;

  @HasMany(() => OrderDetail, { foreignKey: "orderId", as: "orderDetails" })
  declare orderDetails: OrderDetail[];

  @Column(DataType.STRING) declare firstName: string;
  @Column(DataType.STRING) declare lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [10, 10],
        msg: "Phone number must be of 10 digits."
      }
    }
  })
  declare phoneNumber: string;

  @Column(DataType.STRING) declare email: string;
  @Column(DataType.STRING) declare province: string;
  @Column(DataType.STRING) declare district: string;
  @Column(DataType.STRING) declare city: string;
  @Column(DataType.STRING) declare tole: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  declare totalAmount: number;

  @Column({
    type: DataType.ENUM(
      OrderStatus.Cancelled,
      OrderStatus.Delivered,
      OrderStatus.OntheWay,
      OrderStatus.Pending,
      OrderStatus.Preparing
    ),
    defaultValue: OrderStatus.Pending
  })
  declare orderStatus: string;
}

export default Order;
