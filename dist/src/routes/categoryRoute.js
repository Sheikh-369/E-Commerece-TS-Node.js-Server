"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const asyncErrorHandler_1 = __importDefault(require("../services/asyncErrorHandler"));
const router = express_1.default.Router();
router.route("/category").post((0, asyncErrorHandler_1.default)(categoryController_1.default.addCategory));
router.route("/category").get(categoryController_1.default.fetchAllCategories);
router.route("/category/:id").get(categoryController_1.default.fetchSingleCategory);
router.route("/category/:id").delete((0, asyncErrorHandler_1.default)(categoryController_1.default.deleteCategory));
router.route("/category/:id").patch((0, asyncErrorHandler_1.default)(categoryController_1.default.editCategory));
exports.default = router;
