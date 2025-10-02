import {Table,Column,Model,DataType} from 'sequelize-typescript'


@Table({
    tableName : "users", 
    modelName : "User", 
    timestamps : true
})

class User extends Model{
    @Column({
        primaryKey : true, 
        type : DataType.UUID, 
        defaultValue : DataType.UUIDV4
    })
    declare id:string

    @Column({
        type : DataType.STRING
    })
    declare userName:string

    @Column({
        type : DataType.STRING
    })
    declare userEmail:string

    @Column({
        type : DataType.STRING
    })
    declare userPhoneNumber:string

    @Column({
        type : DataType.STRING
    })
    declare userPassword:string 

    @Column({
        type : DataType.ENUM('customer','admin'), 
        defaultValue : 'customer'
    })
    declare role:string

    @Column({
        type:DataType.STRING
    })
    declare OTP:string | null

    @Column({
        type:DataType.DATE
    })
    declare OTPGeneratedTime:Date | null

    @Column({
        type:DataType.DATE
    })
    declare OTPExpiry:Date | null

   
}

export default User