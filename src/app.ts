import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/error.middleware";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server is running!");
});

export default app;
