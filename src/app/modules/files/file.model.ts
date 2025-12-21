import { Schema, model } from "mongoose";
import { IFile } from "./file.interface";

const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["image", "pdf"], required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    folder: { type: Schema.Types.ObjectId, ref: "Folder" },
  },
  { timestamps: true }
);

export const File = model<IFile>("File", fileSchema);
