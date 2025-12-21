import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as FileService from "./file.service";
import { JwtPayload } from "jsonwebtoken";

/* ================= UPLOAD (SINGLE OR MULTI) ================= */
export const uploadFiles = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  let result;

  if (req.file) {
    // single file
    result = await FileService.uploadSingleFile(
      user.userId,
      req.file,
      req.body.folder
    );
  } else if (req.files && Array.isArray(req.files)) {
    // multiple files
    result = await FileService.uploadMultipleFiles(
      user.userId,
      req.files,
      req.body.folder
    );
  } else {
    throw new Error("No file uploaded");
  }

  res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    data: result,
  });
});

/* ================= DELETE FILE ================= */

export const deleteFile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  await FileService.deleteFile(user.userId, req.params.id);

  res.status(200).json({
    success: true,
    message: "File deleted successfully",
  });
});

/* ================= RENAME FILE ================= */
export const renameFile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const file = await FileService.renameFile(
    user.userId,
    req.params.id,
    req.body.name
  );

  res.status(200).json({
    success: true,
    message: "File renamed successfully",
    data: file,
  });
});
