import AppError from "../../errors/AppError";
import { Book } from "../book/book.model";
import { paymentModel } from "./payment.model";

/**
 * Records a payment in the database.
 * @param finalOrder The order details to record.
 * @param productId The ID of the product.
 * @param quantity The quantity of the product.
 */
export const makePayment = async (
  finalOrder: any,
  productId: string,
  quantity: number
) => {
  await paymentModel.create(finalOrder);
};

/**
 * Checks if the requested quantity of a book is available.
 * @param productId The ID of the book.
 * @param quantity The requested quantity.
 * @returns True if the quantity is available, false otherwise.
 */
export const checkQuantityOfBook = async (
  productId: string,
  quantity: number
) => {
  console.log("Checking book quantity for product ID: ", productId);
  const book = await Book.findOne({
    _id: productId,
  });

  if (!book) {
    return false;
  }

  if (book?.quantity < quantity) {
    return false;
  }

  console.log("Available book quantity: ", book?.quantity);
  return true;
};

/**
 * Updates the book quantity, removes the item from the cart, and checks if the book is in stock.
 * @param productId The ID of the book.
 * @param cartId The ID of the cart.
 * @param quantity The quantity of the book.
 */
export const updateQuantityRemoveCartAndCheckInStock = async (
  productId: string,
  cartId: string,
  quantity: number
) => {
  const bookAgain = await Book.findOne({
    _id: productId,
  });

  if (!bookAgain) {
    return;
  }

  const currentQuantity = bookAgain?.quantity;
  console.log("Current book quantity: ", currentQuantity);

  if (currentQuantity === 0) {
    await Book.updateOne({ _id: productId }, { inStock: false });
  }

  return;
};

/**
 * Retrieves all payments from the database (Admin only).
 * @returns An array of all payments, populated with product and user details.
 */
const getAllPaymentByAdminFromDB = async () => {
  const result = await paymentModel
    .find()
    .populate("productId")
    .populate("userId");
  return result;
};

/**
 * Retrieves all payments for a specific user from the database.
 * @param id The ID of the user.
 * @returns An array of payments for the specified user, populated with product details.
 */
const getSpecificPaymentFromDB = async (id: string) => {
  const result = await paymentModel.find({ userId: id }).populate("productId");
  return result;
};

/**
 * Deletes a payment from the database.
 * @param id The ID of the payment to delete.
 * @param loggedUserId The ID of the logged-in user (for authorization).
 * @returns The result of the deletion operation.
 * @throws AppError if the user is not authorized to delete the payment.
 */
const deletePaymentFromDB = async (id: string, loggedUserId: string) => {
  const paymentRecord = await paymentModel.findById({ _id: id });

  if (paymentRecord?.userId?.toString() !== loggedUserId) {
    console.log("Payment user ID: ", paymentRecord?.userId?.toString());
    console.log("Logged-in user ID: ", loggedUserId);
    throw new AppError(401, "Unauthorized to delete this payment.");
  }

  const result = await paymentModel.findByIdAndDelete({ _id: id });
  return result;
};

/**
 * Deletes a payment from the database by an admin.
 * @param id The ID of the payment to delete.
 * @param loggedUserId The ID of the logged-in admin user.
 * @returns The result of the deletion operation.
 */
const deletePaymentByAdminFromDB = async (id: string, loggedUserId: string) => {
  console.log("Deleting order (admin ID:)", loggedUserId);
  const result = await paymentModel.findByIdAndDelete({ _id: id });
  return result;
};

/**
 * Confirms a payment and updates the book quantity.
 * @param id The ID of the payment to confirm.
 * @param payload The payment confirmation payload, including bookId, quantity and adminApproval status.
 */
const confirmPaymentFromDB = async (id: string, payload: any) => {
  const bookId = payload?.bookId;
  const quantity = payload?.quantity;
  const adminApproval = payload?.adminApproval;

  console.log("Admin approval status: ", adminApproval);
  console.log("Book ID: ", bookId);
  console.log("Quantity: ", quantity);

  const paymentUpdateResult = await paymentModel.findByIdAndUpdate(
    { _id: id },
    { adminApproval: adminApproval },
    {
      new: true,
    }
  );

  if (paymentUpdateResult?.adminApproval !== "confirm") {
    return;
  }

  const targetBook = await Book.findOne({
    _id: bookId,
  });
  if (!targetBook) {
    return;
  }
  const tarGetBookQuantity = targetBook?.quantity;
  console.log("Target Book Quantity: ", tarGetBookQuantity);

  const updatedBookResult = await Book.findByIdAndUpdate(
    { _id: bookId },
    { quantity: tarGetBookQuantity - quantity },
    {
      new: true,
    }
  );
  console.log("After Update BOOk Quantity: ", updatedBookResult);

  if (updatedBookResult?.quantity !== 0) {
    return;
  }
  const updateBookInStockFalseRes = await Book.findByIdAndUpdate(
    { _id: bookId },
    { inStock: false },
    {
      new: true,
    }
  );
  console.log("updateBookInStockFalseRes", updateBookInStockFalseRes);
};

export const PaymentService = {
  getAllPaymentByAdminFromDB,
  getSpecificPaymentFromDB,
  deletePaymentFromDB,
  confirmPaymentFromDB,
  deletePaymentByAdminFromDB,
};
