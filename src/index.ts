import express, { Express, Request, Response, Application } from "express";
import { PORT } from "./utils/secrets";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});
