import { Folder } from "./folder.model";
import ApiError from "../../errors/ApiError";
import { IFolder } from "./folder.interface";
import { Types } from "mongoose";
import { Note } from "../notes/note.model";
import { File } from "../files/file.model";

/* ================= CREATE FOLDER ================= */
export const createFolder = async (
  userId: string,
  name: string
): Promise<IFolder> => {
  const folder = await Folder.create({
    name,
    user: new Types.ObjectId(userId),
  });

  return folder;
};

/* ================= GET ALL FOLDERS ================= */
export const getAllFolders = async (userId: string): Promise<IFolder[]> => {
  return await Folder.find({ user: userId }).sort({ createdAt: -1 });
};

/* ================= GET SINGLE FOLDER ================= */
export const getSingleFolder = async (
  userId: string,
  folderId: string
): Promise<IFolder> => {
  const folder = await Folder.findOne({
    _id: folderId,
    user: userId,
  });

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  return folder;
};

/* ================= GET ITEMS UNDER FOLDER ================= */
export const getFolderItems = async (userId: string, folderId: string) => {
  const folder = await Folder.findOne({
    _id: folderId,
    user: userId,
  });

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  const notes = await Note.find({
    user: new Types.ObjectId(userId),
    folder: new Types.ObjectId(folderId),
  }).sort({ createdAt: -1 });

  const files = await File.find({
    user: new Types.ObjectId(userId),
    folder: new Types.ObjectId(folderId),
  }).sort({ createdAt: -1 });

  return {
    folder,
    notes,
    files,
  };
};

/* ================= RENAME FOLDER ================= */
export const renameFolder = async (
  userId: string,
  folderId: string,
  name: string
): Promise<IFolder> => {
  const folder = await Folder.findOneAndUpdate(
    {
      _id: folderId,
      user: userId,
    },
    { name },
    { new: true }
  );

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }

  return folder;
};

/* ================= DELETE FOLDER ================= */
export const deleteFolder = async (
  userId: string,
  folderId: string
): Promise<void> => {
  const folder = await Folder.findOneAndDelete({
    _id: folderId,
    user: userId,
  });

  if (!folder) {
    throw new ApiError(404, "Folder not found");
  }
};
