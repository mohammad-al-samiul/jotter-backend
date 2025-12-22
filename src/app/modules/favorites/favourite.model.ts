import { Schema, model } from "mongoose";
import { IFavourite } from "./favourite.interface";

const favoriteSchema = new Schema<IFavourite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, required: true },
    itemType: {
      type: String,
      enum: ["note", "file", "folder"],
      required: true,
    },
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, itemId: 1, itemType: 1 }, { unique: true });

export const Favourite = model<IFavourite>("Favourite", favoriteSchema);
