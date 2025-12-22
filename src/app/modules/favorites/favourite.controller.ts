import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as FavouriteService from "./favourite.service";

/**
 * Add to favourites
 */
export const addFavourite = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as { userId: string };
  const { itemId, itemType } = req.body;

  const favourite = await FavouriteService.addFavourite(
    user.userId,
    itemId,
    itemType
  );

  res.status(201).json({
    success: true,
    data: favourite,
  });
});

/**
 * Remove from favourites
 */
export const removeFavourite = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as { userId: string };
    const { id } = req.params;

    await FavouriteService.removeFavourite(user.userId, id);

    res.status(200).json({
      success: true,
      message: "Removed from favourites",
    });
  }
);

/**
 * Get user favourites
 */
export const getFavourites = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as { userId: string };

  const favourites = await FavouriteService.getFavourites(user.userId);

  res.status(200).json({
    success: true,
    data: favourites,
  });
});
