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
exports.PaymentService = exports.updateQuantityRemoveCartAndCheckInStock = exports.checkQuantityOfBook = exports.makePayment = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const book_model_1 = require("../book/book.model");
const payment_model_1 = require("./payment.model");
/**
 * Records a payment in the database.
 * @param finalOrder The order details to record.
 * @param productId The ID of the product.
 * @param quantity The quantity of the product.
 */
const makePayment = (finalOrder, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    yield payment_model_1.paymentModel.create(finalOrder);
});
exports.makePayment = makePayment;
/**
 * Checks if the requested quantity of a book is available.
 * @param productId The ID of the book.
 * @param quantity The requested quantity.
 * @returns True if the quantity is available, false otherwise.
 */
const checkQuantityOfBook = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Checking book quantity for product ID: ", productId);
    const book = yield book_model_1.Book.findOne({
        _id: productId,
    });
    if (!book) {
        return false;
    }
    if ((book === null || book === void 0 ? void 0 : book.quantity) < quantity) {
        return false;
    }
    console.log("Available book quantity: ", book === null || book === void 0 ? void 0 : book.quantity);
    return true;
});
exports.checkQuantityOfBook = checkQuantityOfBook;
/**
 * Updates the book quantity, removes the item from the cart, and checks if the book is in stock.
 * @param productId The ID of the book.
 * @param cartId The ID of the cart.
 * @param quantity The quantity of the book.
 */
const updateQuantityRemoveCartAndCheckInStock = (productId, cartId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const bookAgain = yield book_model_1.Book.findOne({
        _id: productId,
    });
    if (!bookAgain) {
        return;
    }
    const currentQuantity = bookAgain === null || bookAgain === void 0 ? void 0 : bookAgain.quantity;
    console.log("Current book quantity: ", currentQuantity);
    if (currentQuantity === 0) {
        yield book_model_1.Book.updateOne({ _id: productId }, { inStock: false });
    }
    return;
});
exports.updateQuantityRemoveCartAndCheckInStock = updateQuantityRemoveCartAndCheckInStock;
/**
 * Retrieves all payments from the database (Admin only).
 * @returns An array of all payments, populated with product and user details.
 */
const getAllPaymentByAdminFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.paymentModel
        .find()
        .populate("productId")
        .populate("userId");
    return result;
});
/**
 * Retrieves all payments for a specific user from the database.
 * @param id The ID of the user.
 * @returns An array of payments for the specified user, populated with product details.
 */
const getSpecificPaymentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.paymentModel.find({ userId: id }).populate("productId");
    return result;
});
/**
 * Deletes a payment from the database.
 * @param id The ID of the payment to delete.
 * @param loggedUserId The ID of the logged-in user (for authorization).
 * @returns The result of the deletion operation.
 * @throws AppError if the user is not authorized to delete the payment.
 */
const deletePaymentFromDB = (id, loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const paymentRecord = yield payment_model_1.paymentModel.findById({ _id: id });
    if (((_a = paymentRecord === null || paymentRecord === void 0 ? void 0 : paymentRecord.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== loggedUserId) {
        console.log("Payment user ID: ", (_b = paymentRecord === null || paymentRecord === void 0 ? void 0 : paymentRecord.userId) === null || _b === void 0 ? void 0 : _b.toString());
        console.log("Logged-in user ID: ", loggedUserId);
        throw new AppError_1.default(401, "Unauthorized to delete this payment.");
    }
    const result = yield payment_model_1.paymentModel.findByIdAndDelete({ _id: id });
    return result;
});
/**
 * Deletes a payment from the database by an admin.
 * @param id The ID of the payment to delete.
 * @param loggedUserId The ID of the logged-in admin user.
 * @returns The result of the deletion operation.
 */
const deletePaymentByAdminFromDB = (id, loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting order (admin ID:)", loggedUserId);
    const result = yield payment_model_1.paymentModel.findByIdAndDelete({ _id: id });
    return result;
});
/**
 * Confirms a payment and updates the book quantity.
 * @param id The ID of the payment to confirm.
 * @param payload The payment confirmation payload, including bookId, quantity and adminApproval status.
 */
const confirmPaymentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = payload === null || payload === void 0 ? void 0 : payload.bookId;
    const quantity = payload === null || payload === void 0 ? void 0 : payload.quantity;
    const adminApproval = payload === null || payload === void 0 ? void 0 : payload.adminApproval;
    console.log("Admin approval status: ", adminApproval);
    console.log("Book ID: ", bookId);
    console.log("Quantity: ", quantity);
    const paymentUpdateResult = yield payment_model_1.paymentModel.findByIdAndUpdate({ _id: id }, { adminApproval: adminApproval }, {
        new: true,
    });
    if ((paymentUpdateResult === null || paymentUpdateResult === void 0 ? void 0 : paymentUpdateResult.adminApproval) !== "confirm") {
        return;
    }
    const targetBook = yield book_model_1.Book.findOne({
        _id: bookId,
    });
    if (!targetBook) {
        return;
    }
    const tarGetBookQuantity = targetBook === null || targetBook === void 0 ? void 0 : targetBook.quantity;
    console.log("Target Book Quantity: ", tarGetBookQuantity);
    const updatedBookResult = yield book_model_1.Book.findByIdAndUpdate({ _id: bookId }, { quantity: tarGetBookQuantity - quantity }, {
        new: true,
    });
    console.log("After Update BOOk Quantity: ", updatedBookResult);
    if ((updatedBookResult === null || updatedBookResult === void 0 ? void 0 : updatedBookResult.quantity) !== 0) {
        return;
    }
    const updateBookInStockFalseRes = yield book_model_1.Book.findByIdAndUpdate({ _id: bookId }, { inStock: false }, {
        new: true,
    });
    console.log("updateBookInStockFalseRes", updateBookInStockFalseRes);
});
exports.PaymentService = {
    getAllPaymentByAdminFromDB,
    getSpecificPaymentFromDB,
    deletePaymentFromDB,
    confirmPaymentFromDB,
    deletePaymentByAdminFromDB,
};
