import { Router } from "express";
import authRoutes from "./auth";

const rootRouter = Router();

// register all routes
rootRouter.use(authRoutes);
export default rootRouter;
