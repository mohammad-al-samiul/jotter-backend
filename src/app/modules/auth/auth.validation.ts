import { z } from "zod";

/* ================= REGISTER ================= */
export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  }),
});

/* ================= LOGIN ================= */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

/* ================= FORGOT PASSWORD ================= */
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

/* ================= RESET PASSWORD ================= */
export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(6),
  }),
});

/* ================= PIN ================= */
export const pinSchema = z.object({
  body: z.object({
    pin: z.string().length(4),
  }),
});
