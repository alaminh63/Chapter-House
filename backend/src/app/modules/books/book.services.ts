/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookSearchableFileds } from './book.constant';
import { IBook } from './book.interface';
import User from '../users/user.model';
import AppError from '../../errors/AppError';
import Book from './book.model';

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  try {
    const books = await Book.find();
    console.log('books: ', books);
    const booksQuery = new QueryBuilder(
      Book.find().populate({ path: 'author', model: 'User' }).lean(),
      query,
    )
      .search(bookSearchableFileds)
      .filter()
      .sort()
      .paginate()
      .fields();

    const meta = await booksQuery.countTotal();
    const result = await booksQuery.modelQuery;

    if (!result.length) {
      return {
        meta: { total: 0, page: 1, limit: 10 },
        result: [],
        message: 'No books found matching the criteria',
      };
    }

    return {
      meta,
      result,
    };
  } catch (error) {
    console.error('Error in getAllBooksFromDB:', error);
    throw new AppError(500, 'Failed to fetch books');
  }
};

const getMyBooksFromDB = async (
  query: Record<string, unknown>,
  userData: JwtPayload,
) => {
  const user = await User.findOne({
    email: userData.email,
    role: userData.role,
  });

  if (!user) throw new AppError(403, 'User not found');

  const booksQuery = new QueryBuilder(
    Book.find({ author: user._id })
      .populate({ path: 'author', model: 'User' })
      .lean(),
    query,
  )
    .search(bookSearchableFileds)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await booksQuery.countTotal();
  const result = await booksQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getABookFromDb = async (id: string) => {
  const book = await Book.findById(id)
    .populate({ path: 'author', model: 'User' })
    .lean();
  if (!book) throw new AppError(404, 'Book not found');
  return book;
};

const createABookInDB = async (
  file: any,
  payload: IBook,
  userData: JwtPayload,
) => {
  const user = await User.findOne({
    email: userData.email,
    role: userData.role,
  });

  if (!user) throw new AppError(403, 'User not found');

  return await Book.create({ img: file?.path, ...payload, author: user._id });
};

const updateABookInDB = async (id: string, updatedVal: Partial<IBook>) => {
  const book = await Book.findByIdAndUpdate(
    id,
    { $set: updatedVal },
    { new: true, runValidators: true },
  ).lean();
  if (!book) throw new AppError(404, 'Book not found');
  return book;
};

const deleteABookFromDB = async (id: string) => {
  const book = await Book.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { new: true, runValidators: true },
  ).lean();
  if (!book) throw new AppError(404, 'Book not found');
  return book;
};

export const bookServices = {
  getAllBooksFromDB,
  getMyBooksFromDB,
  getABookFromDb,
  createABookInDB,
  updateABookInDB,
  deleteABookFromDB,
};
