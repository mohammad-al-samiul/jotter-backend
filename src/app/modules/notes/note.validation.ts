import { z } from "zod";

/* ================= CREATE NOTE ================= */
export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
    folder: z.string().optional(),
  }),
});

/* ================= UPDATE NOTE ================= */
export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    folder: z.string().optional(),
  }),
});
