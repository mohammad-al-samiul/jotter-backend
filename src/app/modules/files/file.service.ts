import { File } from "./file.model";
import ApiError from "../../errors/ApiError";
import { IFile } from "./file.interface";
import fs from "fs";
import path from "path";
import { FileType } from "../../types/file-type.enum";
import { Folder } from "../folders/folder.model";
import { Types } from "mongoose";

/* ================= FILE LIST ================= */
export const getFiles = async (
  userId: string,
  folder?: string
): Promise<IFile[]> => {
  const query: any = { user: userId };

  if (folder) {
    query.folder = folder;
  } else {
    query.folder = { $exists: false };
  }

  return await File.find(query).sort({ createdAt: -1 });
};

/* ================= SINGLE UPLOAD ================= */
export const uploadSingleFile = async (
  userId: string,
  file: Express.Multer.File,
  folder?: string
): Promise<IFile> => {
  //  validate folderId if provided
  if (folder) {
    const exists = await Folder.findOne({ _id: folder, user: userId });
    if (!exists) {
      throw new ApiError(404, "Folder not found");
    }
  }

  return await File.create({
    name: file.originalname,
    type: file.mimetype.startsWith("image") ? "image" : "pdf",
    size: file.size,
    url: `/uploads/${file.filename}`,
    user: userId,
    folder,
  });
};

/* ================= MULTIPLE UPLOAD ================= */
export const uploadMultipleFiles = async (
  userId: string,
  files: Express.Multer.File[],
  folder?: string
): Promise<IFile[]> => {
  if (folder) {
    const exists = await Folder.findOne({
      _id: folder,
      user: userId,
    });
    if (!exists) {
      throw new ApiError(404, "Folder not found");
    }
  }

  const payload = files.map((file) => ({
    name: file.originalname,
    type: file.mimetype.startsWith("image") ? FileType.IMAGE : FileType.PDF,
    size: file.size,
    url: `/uploads/${file.filename}`,
    user: new Types.ObjectId(userId),
    folder: folder ? new Types.ObjectId(folder) : undefined,
  }));

  const createdFiles = await File.insertMany(payload);

  return createdFiles;
};
/* ================= FILE INFO ================= */
export const getFileInfo = async (
  userId: string,
  fileId: string
): Promise<IFile> => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new ApiError(404, "File not found");
  return file;
};

/* ================= VIEW FILE ================= */
export const viewFile = async (
  userId: string,
  fileId: string
): Promise<string> => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new ApiError(404, "File not found");

  return file.url;
};

/* ================= RENAME ================= */
export const renameFile = async (
  userId: string,
  fileId: string,
  name: string
): Promise<IFile> => {
  const file = await File.findOneAndUpdate(
    { _id: fileId, user: userId },
    { name },
    { new: true }
  );
  if (!file) throw new ApiError(404, "File not found");
  return file;
};

/* ================= DELETE (DB + DISK) ================= */
export const deleteFile = async (
  userId: string,
  fileId: string
): Promise<void> => {
  const file = await File.findOneAndDelete({
    _id: fileId,
    user: userId,
  });

  if (!file) throw new ApiError(404, "File not found");

  const filePath = path.join(process.cwd(), "public", file.url);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
