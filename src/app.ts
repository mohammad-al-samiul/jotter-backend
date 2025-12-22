import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/error.middleware";
import path from "path";
import fileRoutes from "./app/modules/files/file.route";

const app: Application = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use("/api/v1/files", fileRoutes);

app.use("/api/v1", router);

app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server is running!");
});

export default app;
