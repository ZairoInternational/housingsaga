import mongoose from "mongoose";

import { UserValidationSchema } from "@/schemas/housingUser.schema";

const userSchema = new mongoose.Schema<UserValidationSchema>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

export const HousingUsers =
  mongoose.models.HousingUsers ||
  mongoose.model<UserValidationSchema>("HousingUsers", userSchema);
