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
exports.BookServices = exports.getAllBooksFromDB = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const book_model_1 = require("./book.model");
// Inserts a new book into the database.  Validates the user reference.
const createBookIntoDB = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { refUser } = bookData;
    // Verify that the referenced user exists
    const isUserExists = yield user_model_1.userModel.findById(refUser);
    if (!isUserExists) {
        throw new AppError_1.default(404, "Referenced user does not exist.");
    }
    // Create the book in the database
    const createdBook = yield book_model_1.Book.create(bookData);
    return createdBook;
});
// Retrieves all books from the database (for admin access).
const getAllBookByAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find();
    return books;
});
const getAllBooksFromDB = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm, category, author, brand, model, minPrice, maxPrice, minQuantity, maxQuantity, inStock, page = 1, limit = 10, sortBy, sortOrder, } = queryParams;
        const query = {};
        // Apply search term (case-insensitive)
        if (searchTerm) {
            query.$or = [
                { title: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ];
        }
        // Apply other filters
        if (category)
            query.category = category;
        // Modified author filter for case-insensitive and partial matching
        if (author) {
            query.author = { $regex: author, $options: "i" };
        }
        if (brand)
            query.brand = brand;
        if (model)
            query.model = model;
        if (inStock !== undefined)
            query.inStock = inStock;
        // Price range filtering
        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice !== undefined)
                query.price.$gte = minPrice;
            if (maxPrice !== undefined)
                query.price.$lte = maxPrice;
        }
        // Quantity range filtering
        if (minQuantity !== undefined || maxQuantity !== undefined) {
            query.quantity = {};
            if (minQuantity !== undefined)
                query.quantity.$gte = minQuantity;
            if (maxQuantity !== undefined)
                query.quantity.$lte = maxQuantity;
        }
        const skip = (page - 1) * limit;
        // Sorting Options
        const sortOptions = {};
        if (sortBy && sortOrder) {
            // Ensure both sortBy and sortOrder are present
            sortOptions[sortBy] =
                sortOrder === "desc" ? "desc" : "asc";
        }
        const books = yield book_model_1.Book.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .exec();
        const totalBooks = yield book_model_1.Book.countDocuments(query).exec();
        return {
            data: books,
            totalBooks,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
        };
    }
    catch (error) {
        // Use "any" or a more specific error type
        console.error("Error fetching books from DB:", error);
        throw new Error(error.message || "Failed to retrieve books."); // Include the error message for better debugging
    }
});
exports.getAllBooksFromDB = getAllBooksFromDB;
// Retrieves a single book from the database by its ID.
const getSingleBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(productId).exec(); // Explicitly execute the query
        return book;
    }
    catch (error) {
        console.error("Error fetching single book from DB:", error);
        throw new Error("Failed to retrieve the book.");
    }
});
// Retrieves a limited number of book images from the database.
const getImagesOfBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield book_model_1.Book.find()
            .select("imageUrl")
            .limit(12)
            .populate("refUser")
            .exec(); // Explicitly execute the query
        return images;
    }
    catch (error) {
        console.error("Error fetching book images from DB:", error);
        throw new Error("Failed to retrieve book images.");
    }
});
// Retrieves a limited number of recently created books for the homepage.
const getHomeBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homeBooks = yield book_model_1.Book.find()
            .sort({ createdAt: -1 })
            .limit(8)
            .populate("refUser")
            .exec(); // Explicitly execute the query
        return homeBooks;
    }
    catch (error) {
        console.error("Error fetching homepage books from DB:", error);
        throw new Error("Failed to retrieve homepage books.");
    }
});
// Retrieves all books associated with a specific user.
const getOwnBookFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.Book.find({ refUser: userId }).exec(); // Explicitly execute the query
        return books;
    }
    catch (error) {
        console.error("Error fetching user's books from DB:", error);
        throw new Error("Failed to retrieve user's books.");
    }
});
// Deletes a book from the database by its ID.
const deleteBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(productId).exec(); // Explicitly execute the query
        return deletedBook;
    }
    catch (error) {
        console.error("Error deleting book from DB:", error);
        throw new Error("Failed to delete the book.");
    }
});
// Updates a book in the database by its ID.
const updateBookFromDB = (productId, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(productId, bookData, {
            new: true,
            runValidators: true, // Enforce schema validation during update
        }).exec(); // Explicitly execute the query
        return updatedBook;
    }
    catch (error) {
        console.error("Error updating book in DB:", error);
        throw new Error("Failed to update the book.");
    }
});
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB: exports.getAllBooksFromDB,
    getSingleBookFromDB,
    deleteBookFromDB,
    updateBookFromDB,
    getOwnBookFromDB,
    getImagesOfBookFromDB,
    getHomeBookFromDB,
    getAllBookByAdmin,
};
