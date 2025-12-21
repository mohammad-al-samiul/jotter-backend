import { Types } from "mongoose";

export interface IFolder {
  _id?: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
}
