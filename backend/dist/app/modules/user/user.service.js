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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
// Registers a new user in the database
const createUserInDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.userModel.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError_1.default(409, "Email address is already registered");
    }
    const createdUser = yield user_model_1.userModel.create(userData);
    return createdUser;
});
// Retrieves all users from the database
const retrieveAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.userModel.find();
    return users;
});
// Deletes a user from the database based on their ID
const removeUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletionResult = yield user_model_1.userModel.findOneAndDelete({ _id: userId });
        if (!deletionResult) {
            throw new Error("User not found"); // Ensures the custom error message is used
        }
        return deletionResult;
    }
    catch (error) {
        throw new AppError_1.default(404, "User not found"); // Changed to AppError
    }
});
// Updates a user's password in the database
const changePasswordInDB = (userId, passwordData) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPasswordInput, newPasswordInput } = passwordData;
    const userRecord = yield user_model_1.userModel.findById(userId);
    if (!userRecord) {
        throw new AppError_1.default(404, "User account not found");
    }
    const passwordMatch = yield bcrypt_1.default.compare(oldPasswordInput, userRecord.password);
    if (!passwordMatch) {
        throw new AppError_1.default(401, "Incorrect old password");
    }
    const hashedNewPassword = yield bcrypt_1.default.hash(newPasswordInput, Number(config_1.default.bcrypt_salt_rounds));
    const updatedUser = yield user_model_1.userModel.findByIdAndUpdate(userId, { password: hashedNewPassword }, { new: true, runValidators: true } // Ensure validation runs during update
    );
    return updatedUser;
});
// Updates a user's information in the database
const modifyUserInDB = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.userModel.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true, // Ensure validation runs during update
        });
        if (!updatedUser) {
            throw new AppError_1.default(404, "User not found for update"); // Explicitly handle the case where the user is not found
        }
        return updatedUser;
    }
    catch (error) {
        if (error.name === "ValidationError") {
            throw new AppError_1.default(400, "Validation failed: " + error.message);
        }
        throw error; //re-throw for generic error handling
    }
});
exports.userServices = {
    registerUserIntoDB: createUserInDB, // aliased
    getAllUser: retrieveAllUsers, //aliased
    updatePasswordIntoDB: changePasswordInDB, // aliased
    deleteUser: removeUserFromDB, // aliased
    updatUserIntoDB: modifyUserInDB, //aliased
};
