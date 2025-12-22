import { Router } from "express";
import * as FileController from "./file.controller";

import validateRequest from "../../middleware/validateRequest";
import {
  renameFileSchema,
  deleteFileSchema,
  uploadFileBodySchema,
  fileIdParamSchema,
} from "./file.validation";
import authMiddleware from "../auth/auth.middleware";
import { upload } from "../../middleware/upload.middleware";

const fileRoutes = Router();

/* ================= UPLOAD ================= */
fileRoutes.post(
  "/",
  authMiddleware,
  upload.any(),
  validateRequest(uploadFileBodySchema),
  FileController.uploadFiles
);

/* ================= VIEW ================= */
fileRoutes.get(
  "/:id/view",
  authMiddleware,
  validateRequest(fileIdParamSchema),
  FileController.viewFile
);

/* ================= FILE INFO ================= */
fileRoutes.get(
  "/:id/info",
  authMiddleware,
  validateRequest(fileIdParamSchema),
  FileController.getFileInfo
);

/* ================= RENAME ================= */
fileRoutes.patch(
  "/:id/rename",
  authMiddleware,
  validateRequest(renameFileSchema),
  FileController.renameFile
);

/* ================= DELETE ================= */
fileRoutes.delete(
  "/:id",
  authMiddleware,
  validateRequest(deleteFileSchema),
  FileController.deleteFile
);

export default fileRoutes;
