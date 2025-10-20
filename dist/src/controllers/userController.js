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
const userModel_1 = __importDefault(require("../database/models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendOTP_1 = require("../services/sendOTP");
const sendMail_1 = __importDefault(require("../services/sendMail"));
class UserControler {
    //**********USER REGISTER LOGIC***********************
    static userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, userEmail, userPassword, userPhoneNumber } = req.body;
            //confirming that the user does not leave fields empty
            if (!userName || !userEmail || !userPassword || !userPhoneNumber) {
                res.status(400).json({
                    message: "Please fill all the fields!"
                });
                return;
            }
            //checking if the email eneterd by the user is already registered
            const data = yield userModel_1.default.findOne({
                where: {
                    userEmail: userEmail
                }
            });
            if (data) {
                res.status(400).json({
                    message: "Email Already Registered!"
                });
                return;
            }
            //user registration concept
            yield userModel_1.default.create({
                userName,
                userEmail,
                userPhoneNumber,
                userPassword: bcrypt_1.default.hashSync(userPassword, 10)
            });
            res.status(201).json({
                message: "User Created Successfully!"
            });
        });
    }
    //**********USER LOGIN LOGIC************
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userEmail, userPassword } = req.body;
            //validation
            if (!userEmail || !userPassword) {
                res.status(400).json({
                    message: "Please fill all the fields!"
                });
                return;
            }
            //comparing email with table in database     
            const data = yield userModel_1.default.findOne({
                where: { userEmail: userEmail }
            });
            if (!data) {
                res.status(400).json({
                    message: "Email Not Registered!"
                });
                return;
            }
            //comparing password
            const isPasswordMatching = bcrypt_1.default.compareSync(userPassword, data.userPassword);
            if (!isPasswordMatching) {
                res.status(400).json({
                    message: "Invalid Email or Password!"
                });
                return;
            }
            //if password & eamil match, genetrate token
            const token = jsonwebtoken_1.default.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: "30d" });
            res.status(200).json({
                message: "User Login Successful!",
                token: token
            });
        });
    }
    //**************FORGOT PASSWORD LOGIC******************
    static forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userEmail } = req.body;
            if (!userEmail) {
                res.status(400).json({
                    message: "Please provide Email!"
                });
                return;
            }
            const user = yield userModel_1.default.findOne({
                where: { userEmail: userEmail }
            });
            if (!user) {
                res.status(400).json({
                    message: "Email Not Registered!"
                });
                return;
            }
            const OTP = (0, sendOTP_1.sendOPT)();
            (0, sendMail_1.default)({
                to: userEmail,
                subject: "Password Reset Request",
                html: `<div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #333;">Password Reset OTP</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) to reset your password is:</p>
            <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; color: #007bff;">${OTP}</div>
            <p>This code is valid for the next 10 minutes. Please do not share it with anyone.</p>
            <p>If you did not request this, you can safely ignore this email.</p>
            <p style="font-size: 12px; color: #777;">Thanks,<br>The Support Team</p>
        </div>`
            });
            user.OTP = OTP.toString();
            user.OTPGeneratedTime = new Date(new Date().getTime());
            user.OTPExpiry = new Date(new Date().getTime() + 600000);
            yield user.save();
            res.json({
                message: "If the email is registered, an OTP was sent to your Email."
            });
        });
    }
    //***************RESET PASWORD LOGIC********************
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userEmail, OTP, newPassword } = req.body;
            if (!userEmail || !OTP || !newPassword) {
                return res.status(400).json({
                    message: "Please provide Email, OTP, and new password."
                });
            }
            const [user] = yield userModel_1.default.findAll({ where: { userEmail } });
            if (!user) {
                return res.status(400).json({
                    message: "Invalid Email or OTP."
                });
            }
            // Check if OTP is expired
            if (!user.OTP || !user.OTPExpiry || new Date() > new Date(user.OTPExpiry)) {
                return res.status(400).json({
                    message: "OTP has expired. Please request a new one."
                });
            }
            // OPTIONAL: If you hashed the OTP, use bcrypt.compareSync here instead
            if (user.OTP !== OTP.toString()) {
                return res.status(400).json({
                    message: "Invalid OTP."
                });
            }
            // Hash the new password and save
            const hashedPassword = bcrypt_1.default.hashSync(newPassword, 10);
            user.userPassword = hashedPassword;
            // Clear OTP fields
            user.OTP = null;
            user.OTPGeneratedTime = null;
            user.OTPExpiry = null;
            yield user.save();
            return res.status(200).json({
                message: "Password has been reset successfully."
            });
        });
    }
    static fetchAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userModel_1.default.findAll({
                attributes: ["id", "userName", "userEmail", "userPhoneNumber", "createdAt"],
                order: [["userName", "ASC"]] // alphabetical order A → Z
            });
            res.status(200).json({
                message: "All Users Fetched Successfully!",
                data: users,
            });
        });
    }
}
exports.default = UserControler;
