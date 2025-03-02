/* eslint-disable no-undef */
/* eslint-disable no-console */
import catchAsync from '../../utils/catchAsync';
import config from '../config';
import AppError from '../errors/AppError';
import { IUserRoles } from '../modules/users/user.interface';
import User from '../modules/users/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
const auth = (...requiredRoles: IUserRoles[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token: ', token);

    // CHECK IF THE TOKEN IS EXISTS
    if (!token) throw new AppError(403, 'You are not authorized!');

    // CHECK IF THE TOKEN IS VALID
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err: any) {
      console.log(err);

      throw new AppError(401, 'Token is invalid!');
    }

    const { role, email } = decoded as JwtPayload;
    //CHECK IF THE USER IS EXISTS
    const user = await User.isUserExistsByEmail(email);

    if (!user) throw new AppError(404, 'This user does not exists!');

    //CHECK IF THE USER IS BLOCKED
    if (user && user.isBlocked)
      throw new AppError(403, 'You are not authorized!');

    //CHECK IF THE USER IS DELETED
    if (user && user.isDeleted)
      throw new AppError(403, 'You are not authorized!');

    //CHECK IF THE USER ROLE IS CORRECT
    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(403, 'You are not authorized');

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
