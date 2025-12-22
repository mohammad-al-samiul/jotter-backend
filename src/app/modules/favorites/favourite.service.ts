import ApiError from "../../errors/ApiError";
import { Favourite } from "./favourite.model";

export const addFavourite = async (
  userId: string,
  itemId: string,
  itemType: string
) => {
  return await Favourite.create({
    user: userId,
    itemId,
    itemType,
  });
};

export const removeFavourite = async (userId: string, favouriteId: string) => {
  const deleted = await Favourite.findOneAndDelete({
    _id: favouriteId,
    user: userId,
  });

  if (!deleted) {
    throw new ApiError(404, "Favourite not found");
  }
};

export const getFavourites = async (userId: string) => {
  return await Favourite.find({ user: userId }).sort({ createdAt: -1 });
};
