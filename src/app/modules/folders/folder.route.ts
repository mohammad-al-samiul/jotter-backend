import { Router } from "express";
import * as FolderController from "./folder.controller";

import validateRequest from "../../middleware/validateRequest";
import {
  createFolderSchema,
  renameFolderSchema,
  deleteFolderSchema,
} from "./folder.validation";
import authMiddleware from "../auth/auth.middleware";

const folderRoutes = Router();

/* ================= CREATE FOLDER ================= */
folderRoutes.post(
  "/",
  authMiddleware,
  validateRequest(createFolderSchema),
  FolderController.createFolder
);

/* ================= READ ================= */
folderRoutes.get("/", authMiddleware, FolderController.getAllFolders);

folderRoutes.get("/:id", authMiddleware, FolderController.getSingleFolder);

/* ================= ITEMS UNDER FOLDER ================= */
folderRoutes.get("/:id/items", authMiddleware, FolderController.getFolderItems);

/* ================= RENAME FOLDER ================= */
folderRoutes.patch(
  "/:id",
  authMiddleware,
  validateRequest(renameFolderSchema),
  FolderController.renameFolder
);

/* ================= DELETE FOLDER ================= */
folderRoutes.delete(
  "/:id",
  authMiddleware,
  validateRequest(deleteFolderSchema),
  FolderController.deleteFolder
);

export default folderRoutes;
