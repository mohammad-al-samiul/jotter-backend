import { Types } from "mongoose";

/* ===== NOTE ENTITY ===== */
export interface INote {
  _id?: Types.ObjectId;
  title: string;
  content?: string;
  user: Types.ObjectId;
  folder?: Types.ObjectId;
}

/* ===== PAYLOADS ===== */
export interface ICreateNotePayload {
  title: string;
  content?: string;
  folder?: string;
}

export interface IUpdateNotePayload {
  title?: string;
  content?: string;
  folder?: string;
}
