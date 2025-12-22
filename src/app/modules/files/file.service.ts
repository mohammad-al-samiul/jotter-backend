import { File } from "./file.model";
import ApiError from "../../errors/ApiError";
import { IFile } from "./file.interface";
import fs from "fs";
import path from "path";
import { FileType } from "../../types/file-type.enum";
import { Folder } from "../folders/folder.model";
import { Types } from "mongoose";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";

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
) => {
  if (!file?.buffer) {
    throw new ApiError(400, "Invalid file buffer");
  }

  if (folder) {
    const exists = await Folder.findOne({ _id: folder, user: userId });
    if (!exists) throw new ApiError(404, "Folder not found");
  }

  const cloud = await uploadToCloudinary(file.buffer, "user-files");

  return await File.create({
    name: file.originalname,
    type: file.mimetype.startsWith("image") ? FileType.IMAGE : FileType.PDF,
    size: file.size,
    url: cloud.url,
    publicId: cloud.publicId,
    user: new Types.ObjectId(userId),
    folder: folder ? new Types.ObjectId(folder) : undefined,
  });
};

/* ================= MULTIPLE UPLOAD ================= */
export const uploadMultipleFiles = async (
  userId: string,
  files: Express.Multer.File[],
  folder?: string
): Promise<IFile[]> => {
  if (folder) {
    const exists = await Folder.findOne({ _id: folder, user: userId });
    if (!exists) {
      throw new ApiError(404, "Folder not found");
    }
  }

  const payload = await Promise.all(
    files.map(async (file) => {
      const cloud = await uploadToCloudinary(file.buffer, "user-files");

      return {
        name: file.originalname,
        type: file.mimetype.startsWith("image") ? FileType.IMAGE : FileType.PDF,
        size: file.size,
        url: cloud.url,
        publicId: cloud.publicId,
        user: new Types.ObjectId(userId),
        folder: folder ? new Types.ObjectId(folder) : undefined,
      };
    })
  );

  return await File.insertMany(payload);
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
