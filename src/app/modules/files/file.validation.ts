import { z } from "zod";
import { FileType } from "../../types/file-type.enum";

/* ================= UPLOAD BODY ================= */
export const uploadFileBodySchema = z.object({
  body: z.object({
    folder: z.string().optional(),
  }),
});

/* ================= DELETE ================= */
export const deleteFileSchema = z.object({
  params: z.object({
    id: z.string().min(1, "File id is required"),
  }),
});

/* ================= RENAME FILE ================= */
export const renameFileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "New file name is required")
      .min(1, "File name cannot be empty"),
  }),
  params: z.object({
    id: z.string().min(1, "File id is required"),
  }),
});
