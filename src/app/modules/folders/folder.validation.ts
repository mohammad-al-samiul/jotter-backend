import { z } from "zod";

/* ================= CREATE FOLDER ================= */
export const createFolderSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Folder name is required")
      .min(1, "Folder name cannot be empty")
      .max(50, "Folder name cannot exceed 50 characters"),
  }),
});

/* ================= RENAME FOLDER ================= */
export const renameFolderSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Folder name is required")
      .min(1, "Folder name cannot be empty")
      .max(50, "Folder name cannot exceed 50 characters"),
  }),
  params: z.object({
    id: z.string().min(1, "Folder id is required"),
  }),
});

/* ================= DELETE FOLDER ================= */
export const deleteFolderSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Folder ID is required"),
  }),
});
