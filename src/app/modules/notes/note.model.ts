import { Schema, model } from "mongoose";
import { INote } from "./note.interface";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    folder: { type: Schema.Types.ObjectId, ref: "Folder" },
  },
  { timestamps: true }
);

export const Note = model<INote>("Note", noteSchema);
