import { Table, Model, DataType, Column } from "sequelize-typescript";

@Table({
  tableName: "categories",
  modelName: "Category",
  timestamps: true
})
class Category extends Model {
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
  declare categoryName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare categoryDescription: string;
}

export default Category;
