"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userValidation_1 = require("./userValidation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const userRouter = express_1.default.Router();
// User registration route
userRouter.post("/register", (0, validateRequest_1.default)(userValidation_1.userValidations.userValidationSchema), user_controller_1.userControllers.registerUser);
// Retrieve all users (Admin only)
userRouter.get("/allusers", (0, auth_1.default)("admin"), user_controller_1.userControllers.getAllUsers);
// Delete a specific user (Admin only)
userRouter.delete("/allusers/:id", (0, auth_1.default)("admin"), user_controller_1.userControllers.deleteUser);
// Update a specific user (Admin only)
userRouter.patch("/allusers/:id", (0, auth_1.default)("admin"), user_controller_1.userControllers.updateUser);
// Change user password (User role required)
userRouter.patch("/updatepassword/:userId", (0, auth_1.default)("user"), user_controller_1.userControllers.updatePassword);
// Export the user routes
exports.userRoutes = userRouter;
