import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";
import config from "../../config";

interface PasswordUpdateData {
  oldPasswordInput: string;
  newPasswordInput: string;
}

// Registers a new user in the database
const createUserInDB = async (userData: TUser) => {
  const existingUser = await userModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(409, "Email address is already registered");
  }

  const createdUser = await userModel.create(userData);
  return createdUser;
};

// Retrieves all users from the database
const retrieveAllUsers = async () => {
  const users = await userModel.find();
  return users;
};

// Deletes a user from the database based on their ID
const removeUserFromDB = async (userId: string) => {
  try {
    const deletionResult = await userModel.findOneAndDelete({ _id: userId });
    if (!deletionResult) {
      throw new Error("User not found"); // Ensures the custom error message is used
    }
    return deletionResult;
  } catch (error) {
    throw new AppError(404, "User not found"); // Changed to AppError
  }
};

// Updates a user's password in the database
const changePasswordInDB = async (
  userId: string,
  passwordData: PasswordUpdateData
) => {
  const { oldPasswordInput, newPasswordInput } = passwordData;

  const userRecord = await userModel.findById(userId);
  if (!userRecord) {
    throw new AppError(404, "User account not found");
  }

  const passwordMatch = await bcrypt.compare(
    oldPasswordInput,
    userRecord.password
  );
  if (!passwordMatch) {
    throw new AppError(401, "Incorrect old password");
  }

  const hashedNewPassword = await bcrypt.hash(
    newPasswordInput,
    Number(config.bcrypt_salt_rounds)
  );

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { password: hashedNewPassword },
    { new: true, runValidators: true } // Ensure validation runs during update
  );

  return updatedUser;
};

// Updates a user's information in the database
const modifyUserInDB = async (userId: string, updateData: TUser) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true, // Ensure validation runs during update
    });
    if (!updatedUser) {
      throw new AppError(404, "User not found for update"); // Explicitly handle the case where the user is not found
    }
    return updatedUser;
  } catch (error: any) {
    if (error.name === "ValidationError") {
      throw new AppError(400, "Validation failed: " + error.message);
    }
    throw error; //re-throw for generic error handling
  }
};

export const userServices = {
  registerUserIntoDB: createUserInDB, // aliased
  getAllUser: retrieveAllUsers, //aliased
  updatePasswordIntoDB: changePasswordInDB, // aliased
  deleteUser: removeUserFromDB, // aliased
  updatUserIntoDB: modifyUserInDB, //aliased
};
