import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchemaDefinition = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, "Email Must be required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password Must be required"],
      maxlength: [10, "Password can not be more than 10 character"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not valid. Role can only be either user or admin",
      },
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Timestamps for creation and update
    toJSON: {
      transform: function (_document, returnedObject) {
        // Secure data transformation: exclude sensitive user details
        delete returnedObject.password;
        delete returnedObject.createdAt;
        delete returnedObject.updatedAt;
        delete returnedObject.__v;
      },
    },
  }
);

// Middleware: Hash password before saving user document
userSchemaDefinition.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const userModel = model<TUser>("users", userSchemaDefinition);