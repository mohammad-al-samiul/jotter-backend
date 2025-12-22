import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import * as FavouriteController from "./favourite.controller";

const favouriteRoutes = Router();

favouriteRoutes.post("/", authMiddleware, FavouriteController.addFavourite);
favouriteRoutes.get("/", authMiddleware, FavouriteController.getFavourites);
favouriteRoutes.delete(
  "/:id",
  authMiddleware,
  FavouriteController.removeFavourite
);

export default favouriteRoutes;
