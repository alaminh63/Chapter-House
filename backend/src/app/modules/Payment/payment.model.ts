import mongoose, { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    transactionId: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: false },
    productId: { type: Schema.Types.ObjectId, ref: "Book", required: false },
    price: { type: Number, required: false },
    quantity: { type: Number, required: false },
    paidStatus: { type: Schema.Types.Mixed, required: false },
    adminApproval: {
      type: String,
      enum: ["pending", "confirm"],
      default: "pending",
      required: false,
    },
  },
  { timestamps: true }
);

export const paymentModel = model<IPayment>("payments", PaymentSchema);