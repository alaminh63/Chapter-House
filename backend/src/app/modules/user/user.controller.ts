import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import AppError from "../../errors/AppError";

// Handle User Registration
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const newUserData = req.body;
    const registrationResult = await userServices.registerUserIntoDB(
      newUserData
    );

    res.status(201).json({
      success: true,
      message: "Account successfully created",
      statusCode: 201,
      data: registrationResult,
    });
  } catch (err: any) {
    next(err); // Forward error to error handling middleware
  }
};

// Retrieve All Users
const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "User records retrieved successfully",
      statusCode: 200, // Corrected status code
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      // More appropriate error code
      success: false,
      message: "Failed to retrieve user records",
      statusCode: 500,
      error: error,
      stack: "error stack", // Consider removing in production for security
    });
  }
};

// Remove a User
const removeUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.params?.id;
    const deletionResult = await userServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: "User successfully removed",
      statusCode: 200,
      data: deletionResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove user",
      statusCode: 500,
      error: error,
      stack: "error stack",
    });
  }
};

// Modify User Information
const modifyUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.params?.id;
    const updateData = req?.body;

    const updateResult = await userServices.updatUserIntoDB(userId, updateData);
    res.status(200).json({
      success: true,
      message: "User information updated successfully",
      statusCode: 200,
      data: updateResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user information",
      statusCode: 500,
      error: error,
      stack: "error stack",
    });
  }
};

// Change User Password
const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const userIdFromParams = req?.params?.userId;
    const passwordData = req.body;

    // Authentication check
    if (req?.user?._id !== userIdFromParams) {
      throw new AppError(403, "Unauthorized access");
    }

    const passwordUpdateResult = await userServices.updatePasswordIntoDB(
      userIdFromParams,
      passwordData
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      statusCode: 200,
      data: passwordUpdateResult,
    });
  } catch (err: any) {
    next(err);
  }
};

export const userControllers = {
  registerUser: createUser, //Renamed
  getAllUsers: fetchAllUsers, //Renamed
  deleteUser: removeUser, //Renamed
  updatePassword: changePassword, //Renamed
  updateUser: modifyUser, //Renamed
};
