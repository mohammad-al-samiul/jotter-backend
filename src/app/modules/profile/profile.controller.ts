import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as ProfileService from "./profile.service";
import { JwtPayload } from "jsonwebtoken";

/* ================= UPDATE PROFILE ================= */
export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const updated = await ProfileService.updateProfile(user.userId, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updated,
  });
});

/* ================= GET PROFILE ================= */
export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const profile = await ProfileService.getProfile(user.userId);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

/* ================= CHANGE PASSWORD ================= */
export const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload & { userId: string };

    await ProfileService.changePassword(
      user.userId,
      req.body.oldPassword,
      req.body.newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }
);

/* ================= DELETE ACCOUNT ================= */
export const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  await ProfileService.deleteAccount(user.userId);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});
