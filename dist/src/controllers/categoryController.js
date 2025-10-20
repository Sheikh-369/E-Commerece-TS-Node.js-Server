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
const categoryModel_1 = __importDefault(require("../database/models/categoryModel"));
class CategoryController {
    //category seeding
    static seedCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            //array of categories
            const data = yield categoryModel_1.default.findAll();
            //if there be no category at all
            if (data.length === 0) {
                yield categoryModel_1.default.bulkCreate(this.categories);
                console.log("Category Seeded Successfully!");
            }
            else {
                console.log("Category Already Seeded!");
            }
        });
    }
    //adding category
    static addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryName, categoryDescription } = req.body;
            if (!categoryName || !categoryDescription) {
                res.status(400).json({
                    message: "Please fill the field!"
                });
                return;
            }
            const data = yield categoryModel_1.default.create({
                categoryName,
                categoryDescription
            });
            res.status(200).json({
                message: "Category Created Successfully!",
                data
            });
        });
    }
    //updating category
    static editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { categoryName, categoryDescription } = req.body;
            if (!categoryName || !categoryDescription) {
                res.status(400).json({
                    message: "Please fill the field!"
                });
                return;
            }
            const data = yield categoryModel_1.default.update({
                categoryName,
                categoryDescription
            }, { where: { id } });
            const updatedCategory = yield categoryModel_1.default.findByPk(id); //updated category
            res.status(200).json({
                message: "Category Updated Successfully!",
                data: updatedCategory
            });
        });
    }
    //fetching all categories
    static fetchAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield categoryModel_1.default.findAll();
            res.status(200).json({
                message: "All Categories Fetched Successfully!",
                data
            });
        });
    }
    //fetching single category
    static fetchSingleCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield categoryModel_1.default.findByPk(id);
            res.status(200).json({
                message: "Single Category Fetched Successfully!",
                data
            });
        });
    }
    //deleting category
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield categoryModel_1.default.findAll({
                where: {
                    id: id
                }
            });
            if (data.length === 0) {
                res.status(404).json({
                    message: "No Category With That id!"
                });
            }
            else {
                yield categoryModel_1.default.destroy({
                    where: {
                        id
                    }
                });
                res.status(200).json({
                    message: "Category Deleted Successfully"
                });
            }
        });
    }
}
//categories to be seeded
CategoryController.categories = [
    {
        categoryName: "Clothing",
        categoryDescription: "Feel the luxury within you."
    },
    {
        categoryName: "Electronics",
        categoryDescription: "We built the safest technology for your comfortness."
    },
    {
        categoryName: "Groceries",
        categoryDescription: "You health matters, every grain is hand picked."
    },
    {
        categoryName: "Drinks",
        categoryDescription: "We value your thirst.Each drop has the feel of quich of heaven!"
    }
];
exports.default = CategoryController;
