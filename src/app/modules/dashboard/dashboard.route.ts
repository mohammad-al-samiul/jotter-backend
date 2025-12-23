import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import * as DashboardController from "./dashboard.controller";

const dashboardRoutes = Router();

dashboardRoutes.get(
  "/storage",
  authMiddleware,
  DashboardController.getStorageOverview
);

dashboardRoutes.get(
  "/summary",
  authMiddleware,
  DashboardController.getDashboardSummary
);

dashboardRoutes.get(
  "/recent",
  authMiddleware,
  DashboardController.getRecentItems
);

export default dashboardRoutes;
