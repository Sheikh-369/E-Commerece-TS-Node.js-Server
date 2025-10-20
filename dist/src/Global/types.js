"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethods = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Preparing"] = "preparing";
    OrderStatus["OntheWay"] = "ontheway";
    OrderStatus["Pending"] = "pending";
    OrderStatus["Cancelled"] = "cancelled";
    OrderStatus["Delivered"] = "delivered";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentMethods;
(function (PaymentMethods) {
    PaymentMethods["Khalti"] = "khalti";
    PaymentMethods["Esewa"] = "esewa";
    PaymentMethods["COD"] = "cod";
})(PaymentMethods || (exports.PaymentMethods = PaymentMethods = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Paid"] = "paid";
    PaymentStatus["Pending"] = "pending";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
