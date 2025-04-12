"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const registrationValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "A full name is needed",
    })
        .trim()
        .min(1, { message: "Name is required" }), // Simplified message
    email: zod_1.z
        .string({
        required_error: "An email address is required",
    })
        .email("Email format is invalid") // Rephrased message
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string({
        required_error: "A password is required for registration",
    })
        .min(8, { message: "Password should be at least 8 characters" }) // Increased min length
        .max(25, { message: "Password cannot exceed 25 characters" }), // Increased max length
    role: zod_1.z
        .enum(["admin", "user"], {
        invalid_type_error: "Role must be 'admin' or 'user'", // Slightly shorter message
    })
        .default("user"),
    isBlocked: zod_1.z.boolean().default(false),
});
exports.userValidations = {
    userValidationSchema: registrationValidationSchema, //Renamed and exported
};
/* Validation schema for user registration, ensuring required fields
are present and conform to specific formats and constraints. */
