import { Router } from "express";
import * as FileController from "./file.controller";

import validateRequest from "../../middleware/validateRequest";
import {
  renameFileSchema,
  deleteFileSchema,
  uploadFileBodySchema,
} from "./file.validation";
import authMiddleware from "../auth/auth.middleware";
import { upload } from "../../middleware/upload.middleware";

const fileRoutes = Router();

/* ================= UPLOAD ================= */
fileRoutes.post(
  "/",
  authMiddleware,
  upload.any(),
  // validateRequest(uploadFileBodySchema),
  FileController.uploadFiles
);

/* ================= DELETE ================= */
fileRoutes.delete(
  "/:id",
  authMiddleware,
  validateRequest(deleteFileSchema),
  FileController.deleteFile
);

/* ================= RENAME ================= */
fileRoutes.patch(
  "/:id/rename",
  authMiddleware,
  validateRequest(renameFileSchema),
  FileController.renameFile
);

export default fileRoutes;
