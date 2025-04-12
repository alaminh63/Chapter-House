import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { userValidations } from "./userValidation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";

const userRouter = express.Router();

// User registration route
userRouter.post(
  "/register",
  validateRequest(userValidations.userValidationSchema),
  userControllers.registerUser
);

// Retrieve all users (Admin only)
userRouter.get("/allusers", auth("admin"), userControllers.getAllUsers);

// Delete a specific user (Admin only)
userRouter.delete("/allusers/:id", auth("admin"), userControllers.deleteUser);

// Update a specific user (Admin only)
userRouter.patch("/allusers/:id", auth("admin"), userControllers.updateUser);

// Change user password (User role required)
userRouter.patch(
  "/updatepassword/:userId",
  auth("user"),
  userControllers.updatePassword
);

// Export the user routes
export const userRoutes = userRouter;