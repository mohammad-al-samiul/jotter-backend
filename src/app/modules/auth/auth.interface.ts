import { Types } from "mongoose";

/* USER */
export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  pin?: string;
  role?: string;
}

/* AUTH REQUESTS */
export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

/* OTP */
export interface IOtp {
  email: string;
  otp: string;
  expiresAt: Date;
}
