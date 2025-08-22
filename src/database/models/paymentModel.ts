import { Table,Column,Model,DataType } from "sequelize-typescript";
import { PaymentMethods, PaymentStatus } from "../../Global/types";

@Table({
    tableName:"paymentMethods",
    modelName:"PaymentMethod",
    timestamps:true
})

class PaymentMethod extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type:DataType.ENUM(PaymentMethods.COD,PaymentMethods.Esewa,PaymentMethods.Khalti),
        defaultValue:PaymentMethods.COD
    })
    declare paymentMethod:string

    @Column({
        type:DataType.ENUM(PaymentStatus.Paid,PaymentStatus.Pending),
        defaultValue:PaymentStatus.Pending
    })
    declare paymentStatus:string

    @Column({
        type:DataType.STRING
    })
    declare pidx:string
}

export default PaymentMethod