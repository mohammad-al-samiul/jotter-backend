import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as FileService from "./file.service";
import { JwtPayload } from "jsonwebtoken";
import { formatFileSize } from "../../utils/fileSize";

/* ================= UPLOAD (SINGLE OR MULTI) ================= */
export const uploadFiles = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  let result;

  if (req.file) {
    result = await FileService.uploadSingleFile(
      user.userId,
      req.file,
      req.body.folder
    );
  } else if (req.files && Array.isArray(req.files)) {
    result = await FileService.uploadMultipleFiles(
      user.userId,
      req.files,
      req.body.folder
    );
  } else {
    throw new Error("No file uploaded");
  }

  const formatResponse = (file: any) => ({
    ...(file.toObject?.() ?? file),
    size: formatFileSize(file.size),
  });

  res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    data: Array.isArray(result)
      ? result.map(formatResponse)
      : formatResponse(result),
  });
});
/* ================= VIEW FILE ================= */
export const viewFile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const url = await FileService.viewFile(user.userId, req.params.id);

  res.redirect(url); //  direct view image/pdf
});

/* ================= FILE INFO ================= */
export const getFileInfo = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const file = await FileService.getFileInfo(user.userId, req.params.id);

  res.status(200).json({
    success: true,
    data: {
      name: file.name,
      type: file.type,
      size: formatFileSize(file.size),
      createdAt: file.createdAt,
    },
  });
});

/* ================= RENAME ================= */
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

/* ================= DELETE FILE ================= */

export const deleteFile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  await FileService.deleteFile(user.userId, req.params.id);

  res.status(200).json({
    success: true,
    message: "File deleted successfully",
  });
});
