import { Router } from "express";
import * as ProfileController from "./profile.controller";

import validateRequest from "../../middleware/validateRequest";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "./profile.validation";
import authMiddleware from "../auth/auth.middleware";

const profileRoutes = Router();

/* ================= UPDATE PROFILE ================= */
profileRoutes.patch(
  "/",
  authMiddleware,
  validateRequest(updateProfileSchema),
  ProfileController.updateProfile
);
/* ================= GET PROFILE ================= */
profileRoutes.get("/", authMiddleware, ProfileController.getProfile);
/* ================= CHANGE PASSWORD ================= */
profileRoutes.patch(
  "/change-password",
  authMiddleware,
  validateRequest(changePasswordSchema),
  ProfileController.changePassword
);

/* ================= DELETE ACCOUNT ================= */
profileRoutes.delete("/", authMiddleware, ProfileController.deleteAccount);

export default profileRoutes;
