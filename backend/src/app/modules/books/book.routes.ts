import express, { NextFunction, Request, Response } from 'express';
import { bookControllers } from './book.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { bookValidationSchema } from './book.validation';
import auth from '../../middlewares/auth';
import USER_ROLES from '../users/user.constant';
import { upload } from '../../config/multer.config';

const router = express.Router();

 
router
  .route('/')
  .get(bookControllers.getAllBooks)
  .post(
    auth(USER_ROLES.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(bookValidationSchema.createBookValidationSchema),
    bookControllers.createABook,
  );

router
  .route('/my-book')
  .get(auth(USER_ROLES.admin, USER_ROLES.user), bookControllers.getMyBooks);

 
router
  .route('/:bookId')
  .get(bookControllers.getABook)
  .patch(
    validateRequest(bookValidationSchema.updateBookValidationSchema),
    bookControllers.updateABook,
  )
  .delete(bookControllers.deleteABook);

export default router;
