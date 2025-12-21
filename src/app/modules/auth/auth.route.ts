import { Router } from "express";
import * as AuthController from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  pinSchema,
} from "./auth.validation";
import authMiddleware from "./auth.middleware";

const authRoutes = Router();

/* ================= AUTH ================= */

authRoutes.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);

authRoutes.post("/login", validateRequest(loginSchema), AuthController.login);

authRoutes.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword
);

authRoutes.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword
);

/* ================= PIN ================= */

authRoutes.post(
  "/pin/set",
  authMiddleware,
  validateRequest(pinSchema),
  AuthController.setupPin
);

authRoutes.post(
  "/pin/verify",
  authMiddleware,
  validateRequest(pinSchema),
  AuthController.checkPin
);

export default authRoutes;
