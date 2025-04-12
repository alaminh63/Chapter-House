import { SortOrder } from "mongoose";
import AppError from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { BookQueryParams } from "./book.controller";
import { TBook } from "./book.interface";
import { Book } from "./book.model";

// Inserts a new book into the database.  Validates the user reference.
const createBookIntoDB = async (bookData: TBook): Promise<TBook> => {
  const { refUser } = bookData;

  // Verify that the referenced user exists
  const isUserExists = await userModel.findById(refUser);
  if (!isUserExists) {
    throw new AppError(404, "Referenced user does not exist.");
  }

  // Create the book in the database
  const createdBook = await Book.create(bookData);
  return createdBook;
};

// Retrieves all books from the database (for admin access).
const getAllBookByAdmin = async (): Promise<TBook[]> => {
  const books = await Book.find();
  return books;
};

// Retrieves books from the database based on provided query parameters.
export const getAllBooksFromDB = async (
  queryParams: BookQueryParams
): Promise<{
  data: TBook[];
  totalBooks: number;
  currentPage: number;
  totalPages: number;
}> => {
  try {
    const {
      searchTerm,
      category,
      author,
      brand,
      model,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
      inStock,
      page = 1, // Default page to 1
      limit = 10, // Default limit to 10
      sortBy,
      sortOrder,
    } = queryParams;

    const query: any = {};

    // Apply search term if provided (case-insensitive)
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { author: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Apply other filters if provided
    if (category) query.category = category;
    if (author) query.author = author;
    if (brand) query.brand = brand;
    if (model) query.model = model;
    if (inStock !== undefined) query.inStock = inStock;

    // Price range filtering
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    // Quantity range filtering
    if (minQuantity !== undefined || maxQuantity !== undefined) {
      query.quantity = {};
      if (minQuantity !== undefined) query.quantity.$gte = minQuantity;
      if (maxQuantity !== undefined) query.quantity.$lte = maxQuantity;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Define sorting options
    const sortOptions: Record<string, SortOrder> = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder as SortOrder;
    }

    // Fetch books from the database with applied filters, sorting, pagination
    const books = await Book.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec(); // Explicitly execute the query

    // Count total number of documents matching the query
    const totalBooks = await Book.countDocuments(query).exec(); // Explicitly execute the query

    return {
      data: books,
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
    };
  } catch (error) {
    console.error("Error fetching books from DB:", error); // Log the error
    throw new Error("Failed to retrieve books.");
  }
};

// Retrieves a single book from the database by its ID.
const getSingleBookFromDB = async (
  productId: string
): Promise<TBook | null> => {
  try {
    const book = await Book.findById(productId).exec(); // Explicitly execute the query
    return book;
  } catch (error) {
    console.error("Error fetching single book from DB:", error);
    throw new Error("Failed to retrieve the book.");
  }
};

// Retrieves a limited number of book images from the database.
const getImagesOfBookFromDB = async (): Promise<TBook[]> => {
  try {
    const images = await Book.find()
      .select("imageUrl")
      .limit(12)
      .populate("refUser")
      .exec(); // Explicitly execute the query
    return images;
  } catch (error) {
    console.error("Error fetching book images from DB:", error);
    throw new Error("Failed to retrieve book images.");
  }
};

// Retrieves a limited number of recently created books for the homepage.
const getHomeBookFromDB = async (): Promise<TBook[]> => {
  try {
    const homeBooks = await Book.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("refUser")
      .exec(); // Explicitly execute the query
    return homeBooks;
  } catch (error) {
    console.error("Error fetching homepage books from DB:", error);
    throw new Error("Failed to retrieve homepage books.");
  }
};

// Retrieves all books associated with a specific user.
const getOwnBookFromDB = async (userId: string): Promise<TBook[]> => {
  try {
    const books = await Book.find({ refUser: userId }).exec(); // Explicitly execute the query
    return books;
  } catch (error) {
    console.error("Error fetching user's books from DB:", error);
    throw new Error("Failed to retrieve user's books.");
  }
};

// Deletes a book from the database by its ID.
const deleteBookFromDB = async (productId: string): Promise<TBook | null> => {
  try {
    const deletedBook = await Book.findByIdAndDelete(productId).exec(); // Explicitly execute the query
    return deletedBook;
  } catch (error) {
    console.error("Error deleting book from DB:", error);
    throw new Error("Failed to delete the book.");
  }
};

// Updates a book in the database by its ID.
const updateBookFromDB = async (
  productId: string,
  bookData: TBook
): Promise<TBook | null> => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(productId, bookData, {
      new: true,
      runValidators: true, // Enforce schema validation during update
    }).exec(); // Explicitly execute the query
    return updatedBook;
  } catch (error) {
    console.error("Error updating book in DB:", error);
    throw new Error("Failed to update the book.");
  }
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  deleteBookFromDB,
  updateBookFromDB,
  getOwnBookFromDB,
  getImagesOfBookFromDB,
  getHomeBookFromDB,
  getAllBookByAdmin,
};
