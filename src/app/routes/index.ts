import { Router } from "express";

import authRoutes from "../modules/auth/auth.route";
import noteRoutes from "../modules/notes/note.route";
import folderRoutes from "../modules/folders/folder.route";
import fileRoutes from "../modules/files/file.route";
import favouriteRoutes from "../modules/favorites/favourite.route";
import calendarRoute from "../modules/calendar/calendar.route";
import searchRoute from "../modules/search/service.route";
import profileRoutes from "../modules/profile/profile.route";

const router = Router();

const routes = [
  { path: "/auth", handler: authRoutes },
  { path: "/notes", handler: noteRoutes },
  { path: "/folders", handler: folderRoutes },
  { path: "/files", handler: fileRoutes },
  { path: "/favourites", handler: favouriteRoutes },
  { path: "/calendar", handler: calendarRoute },
  { path: "/search", handler: searchRoute },
  { path: "/profile", handler: profileRoutes },
];

routes.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
