import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);
app.use(errorMiddleware);

export default app;
