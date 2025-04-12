import AppError from "../../errors/AppError";
import { TCart } from "./cart.interface";
import { CartModel } from "./cart.model";

// Add a new item to the cart in the database
const addItemToCartDB = async (cartItemData: TCart) => {
  const result = await CartModel.create(cartItemData);
  return result;
};

// Retrieve all cart items for a specific user from the database
const getCartItemsFromDB = async (userId: string) => {
  const result = await CartModel.find({ userId: userId }).populate("bookId");
  return result;
};

// Remove a specific item from the cart in the database
const removeItemFromCartDB = async (cartItemId: string, userAuthId: string) => {
  // Validate user authorization before deletion
  const cartItem = await CartModel.findById(cartItemId);

  if (!cartItem) {
      throw new AppError(404, "Cart item not found");
  }

  if (cartItem?.userId?.toString() !== userAuthId) {
    throw new AppError(403, "Forbidden: You are not authorized to remove this item");
  }

  const result = await CartModel.findByIdAndDelete({ _id: cartItemId });
  return result;
};

export const cartServices = {
  createCartDB: addItemToCartDB, //Aliased
  getAllCartFromDB: getCartItemsFromDB, //Aliased
  deleteCartFromDB: removeItemFromCartDB, //Aliased
};