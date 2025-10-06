import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { OrderStatus } from "../../Global/types";
import User from "./userModel";
import Payment from "./paymentModel";


@Table({
  tableName: "orders",
  modelName: "Order",
  timestamps: true
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

  @Column({
    type:DataType.STRING,
    allowNull:false
  })
  declare firstName:string

    @Column({
    type:DataType.STRING,
    allowNull:false
  })
  declare lastName:string

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

  @Column({
    type:DataType.STRING,
    allowNull:false
  })
  declare email:string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare province: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare district: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare tole: string;

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
