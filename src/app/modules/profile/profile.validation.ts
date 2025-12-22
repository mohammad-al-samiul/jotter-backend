import { z } from "zod";

/* ================= UPDATE PROFILE ================= */
export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    avatar: z.string().url().optional(),
  }),
});

/* ================= CHANGE PASSWORD ================= */
export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});
