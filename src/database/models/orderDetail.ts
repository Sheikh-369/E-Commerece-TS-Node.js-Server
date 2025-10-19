// import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
// import Order from "./orderModel";
// import Product from "./productModel";

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



import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import Order from "./orderModel";
import Product from "./productModel";

@Table({
  tableName: "orderDetails",
  modelName: "OrderDetail",
  timestamps: true
})
class OrderDetail extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare orderId: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare productId: string;

  @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
  declare product: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare orderQuantity: number;
}

export default OrderDetail;
