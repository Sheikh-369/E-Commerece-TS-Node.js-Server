"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelize = new sequelize_typescript_1.Sequelize(process.env.CONNECTON_STRING, {
    models: [__dirname + '/models']
});
try {
    sequelize.authenticate()
        .then(() => {
        console.log("Authentication Successful!");
    })
        .catch((err) => {
        console.error(`Unexpected Error occurred: ${err}`);
    });
}
catch (error) {
    console.log(error);
}
sequelize.sync({ force: false, alter: false }).then(() => {
    console.log("Migration Successful!");
});
exports.default = sequelize;
