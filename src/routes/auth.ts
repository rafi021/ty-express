import { Router } from "express";
import { login, register } from "../controllers/AuthController";

const authRoutes: Router = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);

export default authRoutes;
