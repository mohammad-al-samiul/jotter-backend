import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import * as CalendarController from "./calendar.controller";

const calendarRoute = Router();
calendarRoute.get("/", authMiddleware, CalendarController.getCalendarItems);

export default calendarRoute;
