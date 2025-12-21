import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as FolderService from "./folder.service";
import { JwtPayload } from "jsonwebtoken";

/* ================= CREATE FOLDER ================= */
export const createFolder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const folder = await FolderService.createFolder(user.userId, req.body.name);

  res.status(201).json({
    success: true,
    message: "Folder created successfully",
    data: folder,
  });
});

/* ================= GET ALL FOLDERS ================= */
export const getAllFolders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const folders = await FolderService.getAllFolders(user.userId);

  res.status(200).json({
    success: true,
    data: folders,
  });
});

/* ================= GET SINGLE FOLDER ================= */
export const getSingleFolder = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload & { userId: string };

    const folder = await FolderService.getSingleFolder(
      user.userId,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: folder,
    });
  }
);

/* ================= GET ITEMS UNDER FOLDER ================= */
export const getFolderItems = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as { userId: string };

    const data = await FolderService.getFolderItems(user.userId, req.params.id);

    res.status(200).json({
      success: true,
      data,
    });
  }
);

/* ================= RENAME FOLDER ================= */
export const renameFolder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const folder = await FolderService.renameFolder(
    user.userId,
    req.params.id,
    req.body.name
  );

  res.status(200).json({
    success: true,
    message: "Folder renamed successfully",
    data: folder,
  });
});

/* ================= DELETE FOLDER ================= */
export const deleteFolder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  await FolderService.deleteFolder(user.userId, req.params.id);

  res.status(200).json({
    success: true,
    message: "Folder deleted successfully",
  });
});
