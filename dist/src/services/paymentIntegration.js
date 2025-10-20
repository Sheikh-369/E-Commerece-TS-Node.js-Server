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
exports.khaltiPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const khaltiPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("https://a.khalti.com/api/v2/epayment/initiate/", {
        return_url: data.return_url,
        website_url: data.website_url,
        amount: data.totalAmount * 100,
        purchase_order_id: data.purchase_order_id,
        purchase_order_name: "order_" + data.purchase_order_name
    }, {
        headers: {
            Authorization: "Key d6b8b250e2024fb5b258a9beee2fa6c6"
        }
    });
    const khaltiResponse = response.data;
    console.log(khaltiResponse);
    return response;
});
exports.khaltiPayment = khaltiPayment;
