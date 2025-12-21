import { Router } from "express";

import authRoutes from "../modules/auth/auth.route";
import noteRoutes from "../modules/notes/note.route";

const router = Router();

const routes = [
  { path: "/auth", handler: authRoutes },
  { path: "/notes", handler: noteRoutes },
];

routes.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
