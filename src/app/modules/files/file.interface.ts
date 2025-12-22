import { Types } from "mongoose";
import { FileType } from "../../types/file-type.enum";

/* ================= FILE ENTITY ================= */
export interface IFile {
  _id?: Types.ObjectId;
  name: string;
  type: FileType;
  size: number;
  url: string;
  user: Types.ObjectId;
  folder?: Types.ObjectId;
  publicId: string;
  createdAt: Date;
}

/* ================= PAYLOADS ================= */
export interface IUploadFilePayload {
  name: string;
  type: FileType;
  size: number;
  url: string;
  folder?: string;
}
