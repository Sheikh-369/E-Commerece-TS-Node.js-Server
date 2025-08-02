import { Table,Model,Column,DataType } from "sequelize-typescript";
import { OrderStatus } from "../../Global/types";

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
        type:DataType.STRING,
        allowNull:false,
        validate:{
            len:{
                args:[10,10],//maximum,minimum
                msg:"Phone number must be of 10 digits."
            }
        }
    })
    declare phoneNumber:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare shippingAddress:string

    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    declare totalAmount:number

    @Column({
        type:DataType.ENUM(OrderStatus.Cancelled,OrderStatus.Delivered,OrderStatus.OntheWay,OrderStatus.Pending,OrderStatus.Preparing),
        defaultValue:OrderStatus.Pending
    })
    declare orderStatus:string

}
export default OrderDetail