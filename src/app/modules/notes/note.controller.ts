import { Request, Response } from "express";
import * as NoteService from "./note.service";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

export const createNote = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };
  const note = await NoteService.createNote(user.userId, req.body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
});

export const getNote = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };
  const note = await NoteService.getSingleNote(user.userId, req.params.id);

  res.status(200).json({ success: true, data: note });
});

export const updateNote = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };
  const note = await NoteService.updateNote(
    user.userId,
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
});

export const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };
  await NoteService.deleteNote(user.userId, req.params.id);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

/* ================= DUPLICATE NOTE ================= */
export const duplicateNote = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };

  const note = await NoteService.duplicateNote(user.userId, req.params.id);

  res.status(201).json({
    success: true,
    message: "Note duplicated successfully",
    data: note,
  });
});
