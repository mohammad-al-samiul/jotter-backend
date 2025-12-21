import { Note } from "./note.model";
import ApiError from "../../errors/ApiError";

export const createNote = async (userId: string, payload: any) => {
  return await Note.create({ ...payload, user: userId });
};

export const getSingleNote = async (userId: string, noteId: string) => {
  const note = await Note.findOne({ _id: noteId, user: userId });
  if (!note) throw new ApiError(404, "Note not found");
  return note;
};

export const updateNote = async (
  userId: string,
  noteId: string,
  payload: any
) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    payload,
    { new: true }
  );
  if (!note) throw new ApiError(404, "Note not found");
  return note;
};

export const deleteNote = async (userId: string, noteId: string) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
  if (!note) throw new ApiError(404, "Note not found");
  return true;
};
