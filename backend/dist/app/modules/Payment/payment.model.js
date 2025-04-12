"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    transactionId: { type: String, required: false },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: false },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: false },
    price: { type: Number, required: false },
    quantity: { type: Number, required: false },
    paidStatus: { type: mongoose_1.Schema.Types.Mixed, required: false },
    adminApproval: {
        type: String,
        enum: ["pending", "confirm"],
        default: "pending",
        required: false,
    },
}, { timestamps: true });
exports.paymentModel = (0, mongoose_1.model)("payments", PaymentSchema);
