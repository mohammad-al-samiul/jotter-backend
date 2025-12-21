import { File } from "./file.model";
import ApiError from "../../errors/ApiError";
import { IFile } from "./file.interface";
import fs from "fs";
import path from "path";
import { FileType } from "../../types/file-type.enum";

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

/* ================= SINGLE UPLOAD ================= */
export const uploadSingleFile = async (
  userId: string,
  file: Express.Multer.File,
  folder?: string
): Promise<IFile> => {
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
  const payload = files.map((file) => ({
    name: file.originalname,
    type: file.mimetype.startsWith("image") ? FileType.IMAGE : FileType.PDF,
    size: file.size,
    url: `/uploads/${file.filename}`,
    user: userId,
    folder,
  }));

  await File.insertMany(payload);

  return File.find({ user: userId }).lean<IFile[]>();
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
