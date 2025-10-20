"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("./database/models/userModel"));
const adminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield userModel_1.default.findAll({
        where: {
            userEmail: process.env.ADMIN_EMAIL
        }
    });
    if (!data) {
        yield userModel_1.default.create({
            userName: process.env.ADMIN_USERNAME,
            userPassword: bcrypt_1.default.hashSync(process.env.ADMIN_PASSWORD, 8),
            userEmail: process.env.ADMIN_EMAIL,
            role: "admin"
        });
        console.log("Admin Seeded Successfully!");
    }
    else {
        console.log("Admin Already Seeded!");
    }
});
exports.default = adminSeeder;
