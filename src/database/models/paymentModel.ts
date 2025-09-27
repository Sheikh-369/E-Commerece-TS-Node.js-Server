import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { PaymentMethods, PaymentStatus } from "../../Global/types";
import Order from "./orderModel";

@Table({
  tableName: "payments",
  modelName: "Payment",
  timestamps: true
})
class Payment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @Column({
    type: DataType.ENUM(PaymentMethods.COD, PaymentMethods.Esewa, PaymentMethods.Khalti),
    defaultValue: PaymentMethods.COD
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.ENUM(PaymentStatus.Paid, PaymentStatus.Pending),
    defaultValue: PaymentStatus.Pending
  })
  declare paymentStatus: string;

  @Column({
    type: DataType.STRING
  })
  declare pidx: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare orderId: string;
}

export default Payment;
