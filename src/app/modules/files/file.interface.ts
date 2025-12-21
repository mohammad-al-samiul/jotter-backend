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
}

/* ================= PAYLOADS ================= */
export interface IUploadFilePayload {
  name: string;
  type: FileType;
  size: number;
  url: string;
  folder?: string;
}
