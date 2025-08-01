import { Table,Model,Column,DataType } from "sequelize-typescript";

@Table({
    tableName:"orderDetails",
    modelName:"OrderDetail",
    timestamps:true
})

class OrderDetail extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare orderQuantity:number
}

export default OrderDetail