import { Request, Response } from 'express';
import { bookServices } from './book.services';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  
  const { query } = req;

  const result = await bookServices.getAllBooksFromDB(query);
 

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book  retrieved successfully!',
    data: result.result,
    meta: result.meta,
  });
});
const getMyBooks = catchAsync(async (req: Request, res: Response) => {
  const { query } = req;
  const user = req.user;

  const result = await bookServices.getMyBooksFromDB(query, user!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Books retrieved successfully!',
    data: result.result,
    meta: result.meta,
  });
});

const getABook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const result = await bookServices.getABookFromDb(bookId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book retrieved successfully!',
    data: result,
  });
});

const createABook = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await bookServices.createABookInDB(req.file, req.body, user!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

const updateABook = catchAsync(async (req: Request, res: Response) => {
  const updatedVal = req.body;
  const { bookId } = req.params;
  const result = await bookServices.updateABookInDB(bookId, updatedVal);

  if (!result) throw new Error("This book doesn't exist on database 💥");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book updated successfully!',
    data: result,
  });
});

const deleteABook = catchAsync(async (req: Request, res: Response) => {
  const { BookId } = req.params;
  const result = await bookServices.deleteABookFromDB(BookId);

  if (!result) throw new Error("This book doesn't exist on database 💥");

  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'Book deleted successfully!',
    data: {},
  });
});

export const bookControllers = {
  getAllBooks,
  getMyBooks,
  getABook,
  createABook,
  updateABook,
  deleteABook,
};
