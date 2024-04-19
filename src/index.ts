import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";
import { PORT } from "./utils/secrets";
import { ErrorResponse, SuccessResponse } from "./utils/apiResponse";
import rootRouter from "./routes";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/up", (req: Request, res: Response) => {
  res.send(new SuccessResponse("Welcome to Express & TypeScript Server"));
});

//use routes
app.use("/api", rootRouter);

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof ErrorResponse) {
    res
      .status(err.statusCode)
      .json(new ErrorResponse(err.message, err.statusCode));
  } else {
    res.status(500).json(new ErrorResponse("Internal Server Error", 500));
  }
});

app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});
