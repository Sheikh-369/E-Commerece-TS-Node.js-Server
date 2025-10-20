"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.route("/register").post(userController_1.default.userRegister);
router.route("/users").get(userController_1.default.fetchAllUsers);
router.route("/login").post(userController_1.default.userLogin);
router.route("/forgot-password").post(userController_1.default.forgotPassword);
router.route("/reset-password").post(userController_1.default.resetPassword);
exports.default = router;
