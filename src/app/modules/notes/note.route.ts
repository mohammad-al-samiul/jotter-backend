import { Router } from "express";
import * as NoteController from "./note.controller";
import authMiddleware from "../auth/auth.middleware";
import validateRequest from "../../middleware/validateRequest";
import { createNoteSchema, updateNoteSchema } from "./note.validation";

const noteRoutes = Router();
noteRoutes.post(
  "/",
  authMiddleware,
  validateRequest(createNoteSchema),
  NoteController.createNote
);

noteRoutes.get("/:id", authMiddleware, NoteController.getNote);

noteRoutes.patch(
  "/:id",
  authMiddleware,
  validateRequest(updateNoteSchema),
  NoteController.updateNote
);
/* ================= DUPLICATE ================= */
noteRoutes.post("/:id/duplicate", authMiddleware, NoteController.duplicateNote);

noteRoutes.delete("/:id", authMiddleware, NoteController.deleteNote);

export default noteRoutes;
