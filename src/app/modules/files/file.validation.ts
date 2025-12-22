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

/* ================= RENAME ================= */
export const renameFileSchema = z.object({
  body: z.object({
    name: z.string().min(1, "File name required"),
  }),
  params: z.object({
    id: z.string(),
  }),
});

/* ================= FILE INFO ================= */
export const fileIdParamSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
