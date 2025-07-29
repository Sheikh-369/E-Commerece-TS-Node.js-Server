import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import Category from "./models/categoryModel";
import Product from "./models/productModel";
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

sequelize.sync({alter:false}).then(()=>{
    console.log("Migration Successful!")
})

Category.hasOne(Product,{foreignKey:'categoryId'})
Product.belongsTo(Category,{foreignKey:'categoryId'})

export default sequelize;
