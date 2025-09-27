import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Category from './categoryModel'

@Table({
  tableName: "products",
  modelName: "Product",
  timestamps: true
})
class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare productName: string;

  @Column({
    type: DataType.TEXT
  })
  declare productDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare productPrice: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare productTotalStock: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare productDiscount: number;

  @Column({
    type: DataType.STRING
  })
  declare productImage: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare categoryId: string;

  @BelongsTo(() => Category)
  declare category: Category; // ⬅️ This is what was missing
}

export default Product;
