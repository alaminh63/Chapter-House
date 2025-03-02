/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookSearchableFileds } from './book.constant';
import { IBook } from './book.interface';

import User from '../users/user.model';
import AppError from '../../errors/AppError';
import Book from './book.model';

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const booksQuery = new QueryBuilder(
    Book.find().populate({ path: 'author', model: 'User' }),
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
    Book.find({ author: user._id }).populate({ path: 'author', model: 'User' }),
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
  return await Book.findById(id);
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

  return await Book.create({ img: file.path, ...payload, author: user._id });
};

const updateABookInDB = async (id: string, updatedVal: IBook) => {
  return await Book.findByIdAndUpdate(
    id,
    { $set: updatedVal },

    { new: true, runValidators: true, context: 'query ' },
  );
};

const deleteABookFromDB = async (id: string) => {
  return await Book.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },

    { new: true, runValidators: true, context: 'query ' },
  );
};

export const bookServices = {
  getAllBooksFromDB,
  getMyBooksFromDB,
  getABookFromDb,
  createABookInDB,
  updateABookInDB,
  deleteABookFromDB,
};
