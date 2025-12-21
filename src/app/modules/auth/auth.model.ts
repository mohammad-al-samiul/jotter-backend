import { model, Schema } from "mongoose";
import { IOtp, IUser } from "./auth.interface";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pin: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);

const otpSchema = new Schema<IOtp>(
  {
    email: String,
    otp: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

export const OTP = model<IOtp>("OTP", otpSchema);
