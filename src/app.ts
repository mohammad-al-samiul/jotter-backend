import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express.js with MongoDb!");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

export default app;
