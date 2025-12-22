import { Router } from "express";

import authRoutes from "../modules/auth/auth.route";
import noteRoutes from "../modules/notes/note.route";
import folderRoutes from "../modules/folders/folder.route";
import fileRoutes from "../modules/files/file.route";

const router = Router();

const routes = [
  { path: "/auth", handler: authRoutes },
  { path: "/notes", handler: noteRoutes },
  { path: "/folders", handler: folderRoutes },
  // { path: "/files", handler: fileRoutes },
];

routes.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
