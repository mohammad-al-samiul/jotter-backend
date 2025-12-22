import authMiddleware from "../auth/auth.middleware";
import * as SearchController from "./search.controller";
import { Router } from "express";

const searchRoute = Router();
searchRoute.get("/", authMiddleware, SearchController.globalSearch);

export default searchRoute;
