import { Types } from "mongoose";

export type FavouriteItemType = "note" | "file" | "folder";

export interface IFavourite {
  user: Types.ObjectId;
  itemId: Types.ObjectId;
  itemType: FavouriteItemType;
  createdAt?: Date;
}
