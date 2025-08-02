import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import Category from "./models/categoryModel";
import Product from "./models/productModel";
import User from "./models/userModel";
import OrderDetail from "./models/orderDetailModel";
import PaymentMethod from "./models/paymentModel";
import OrderQuantity from "./models/orderQuantity";
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

// User X OrderDetails
User.hasMany(OrderDetail)
OrderDetail.belongsTo(User)

// PaymentMethod X OrderDetail 
PaymentMethod.hasOne(OrderDetail)
OrderDetail.belongsTo(PaymentMethod)

//OrderDetail X OrderQuantity
OrderDetail.hasOne(OrderQuantity)
OrderQuantity.belongsTo(OrderDetail)

// Product X OrderQuantity
Product.hasMany(OrderQuantity)
OrderQuantity.belongsTo(Product)


export default sequelize;
