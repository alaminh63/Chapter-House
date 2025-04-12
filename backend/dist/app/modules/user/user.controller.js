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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Handle User Registration
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserData = req.body;
        const registrationResult = yield user_service_1.userServices.registerUserIntoDB(newUserData);
        res.status(201).json({
            success: true,
            message: "Account successfully created",
            statusCode: 201,
            data: registrationResult,
        });
    }
    catch (err) {
        next(err); // Forward error to error handling middleware
    }
});
// Retrieve All Users
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userServices.getAllUser();
        res.status(200).json({
            success: true,
            message: "User records retrieved successfully",
            statusCode: 200, // Corrected status code
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            // More appropriate error code
            success: false,
            message: "Failed to retrieve user records",
            statusCode: 500,
            error: error,
            stack: "error stack", // Consider removing in production for security
        });
    }
});
// Remove a User
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const deletionResult = yield user_service_1.userServices.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: "User successfully removed",
            statusCode: 200,
            data: deletionResult,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to remove user",
            statusCode: 500,
            error: error,
            stack: "error stack",
        });
    }
});
// Modify User Information
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const updateData = req === null || req === void 0 ? void 0 : req.body;
        const updateResult = yield user_service_1.userServices.updatUserIntoDB(userId, updateData);
        res.status(200).json({
            success: true,
            message: "User information updated successfully",
            statusCode: 200,
            data: updateResult,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update user information",
            statusCode: 500,
            error: error,
            stack: "error stack",
        });
    }
});
// Change User Password
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userIdFromParams = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        const passwordData = req.body;
        // Authentication check
        if (((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id) !== userIdFromParams) {
            throw new AppError_1.default(403, "Unauthorized access");
        }
        const passwordUpdateResult = yield user_service_1.userServices.updatePasswordIntoDB(userIdFromParams, passwordData);
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
            statusCode: 200,
            data: passwordUpdateResult,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.userControllers = {
    registerUser: createUser, //Renamed
    getAllUsers: fetchAllUsers, //Renamed
    deleteUser: removeUser, //Renamed
    updatePassword: changePassword, //Renamed
    updateUser: modifyUser, //Renamed
};
