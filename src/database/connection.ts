import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import Category from "./models/categoryModel";
import Product from "./models/productModel";
import User from "./models/userModel";
import PaymentMethod from "./models/paymentModel";
import Order from "./models/orderModel";
import OrderDetail from "./models/orderDetail";
config();


const sequelize = new Sequelize(process.env.CONNECTON_STRING as string,{
    models : [__dirname + '/models']
});

try {
    sequelize.authenticate()
  .then(() => {
    console.log("Authentication Successful!");
  })
  .catch((err) => {
    console.error(`Unexpected Error occurred: ${err}`);
  });
} catch (error) {
    console.log(error)
}

sequelize.sync({force:false,alter:false}).then(()=>{
    console.log("Migration Successful!")
})

Category.hasOne(Product,{foreignKey:'categoryId'})
Product.belongsTo(Category,{foreignKey:'categoryId'})

// User X Order
User.hasMany(Order,{foreignKey:'userId'})
Order.belongsTo(User,{foreignKey:'userId'})

// PaymentMethod X Order 
PaymentMethod.hasOne(Order,{foreignKey:'paymentId'})
Order.belongsTo(PaymentMethod,{foreignKey:'paymentId'})

//Order X OrderDetail
Order.hasOne(OrderDetail,{foreignKey:'orderId'})
OrderDetail.belongsTo(Order,{foreignKey:'orderId'})

// Product X OrderQuantity
Product.hasMany(OrderDetail,{foreignKey:'productId'})
OrderDetail.belongsTo(Product,{foreignKey:'productId'})


export default sequelize;
