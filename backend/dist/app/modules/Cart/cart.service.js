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
exports.cartServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const cart_model_1 = require("./cart.model");
// Add a new item to the cart in the database
const addItemToCartDB = (cartItemData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.CartModel.create(cartItemData);
    return result;
});
// Retrieve all cart items for a specific user from the database
const getCartItemsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.CartModel.find({ userId: userId }).populate("bookId");
    return result;
});
// Remove a specific item from the cart in the database
const removeItemFromCartDB = (cartItemId, userAuthId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validate user authorization before deletion
    const cartItem = yield cart_model_1.CartModel.findById(cartItemId);
    if (!cartItem) {
        throw new AppError_1.default(404, "Cart item not found");
    }
    if (((_a = cartItem === null || cartItem === void 0 ? void 0 : cartItem.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== userAuthId) {
        throw new AppError_1.default(403, "Forbidden: You are not authorized to remove this item");
    }
    const result = yield cart_model_1.CartModel.findByIdAndDelete({ _id: cartItemId });
    return result;
});
exports.cartServices = {
    createCartDB: addItemToCartDB, //Aliased
    getAllCartFromDB: getCartItemsFromDB, //Aliased
    deleteCartFromDB: removeItemFromCartDB, //Aliased
};
