import { Request, Response, NextFunction } from "express";
import { authenticateUser, registerUser } from "../services/authService";
import { ErrorResponse, SuccessResponse } from "../utils/apiResponse";
import { loginSchema, registerSchema } from "../validations/authValidation";
import prisma from "../DB/db.config";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validation Check
    const { name, email, password, phone } = registerSchema.parse(req.body);

    // check if user already registered
    let user = await prisma.users.findFirst({ where: { email } });
    if (user) {
      throw new ErrorResponse("User already registered", 400);
    }

    // the create new user
    const userData = {
      name,
      email,
      password,
      phone,
    };
    user = await registerUser(userData);
    const token = await authenticateUser(userData.email, userData.password);
    if (token) {
      res.json(
        new SuccessResponse("Registration successful", {
          user,
          token,
        })
      );
    } else {
      throw new ErrorResponse("Invalid username or password", 401);
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const responseData = await authenticateUser(email, password);
    if (responseData) {
      res.json(new SuccessResponse("Login successful", { responseData }));
    } else {
      throw new ErrorResponse("Invalid username or password", 401);
    }
  } catch (error) {
    next(error);
  }
};
