import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

/* ================= REGISTER ================= */
export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

/* ================= LOGIN ================= */
export const login = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data,
  });
});

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    await AuthService.sendForgotOtp(req.body.email);

    res.status(200).json({
      success: true,
      message: "OTP sent to your registered email",
    });
  }
);

/* ================= RESET PASSWORD ================= */
export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resetPassword(req.body);

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});

/* ================= SET PIN ================= */
export const setupPin = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  await AuthService.setPin(user.userId, req.body.pin);

  res.status(200).json({
    success: true,
    message: "PIN set successfully",
  });
});

/* ================= VERIFY PIN ================= */
export const checkPin = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  await AuthService.verifyPin(user.userId, req.body.pin);

  res.status(200).json({
    success: true,
    message: "PIN verified successfully",
  });
});
