import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import User from "./userModel";
import Product from "./productModel";


@Table({
  tableName: "carts",
  modelName: "Cart",
  timestamps: true
})
class Cart extends Model {
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

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare productId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare quantity: number;
}

export default Cart;
