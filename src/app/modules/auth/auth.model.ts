import { model, Schema } from "mongoose";
import { IOtp, IUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";

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

// Hash OTP before save
otpSchema.pre("save", async function (this: any) {
  if (!this.isModified("otp")) return;

  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
});

// Compare OTP
otpSchema.methods.compareOtp = function (enteredOtp: string) {
  return bcrypt.compare(enteredOtp, this.otp);
};

export const OTP = model<IOtp>("OTP", otpSchema);
