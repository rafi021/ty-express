import { registerSchema } from "./../validations/authValidation";
// services/authService.ts
import bcrypt from "bcrypt";
import { getUserByEmail } from "./userService";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secrets";
import { User } from "../types/user";
import prisma from "../DB/db.config";
import { ErrorResponse } from "../utils/apiResponse";

export const registerUser = async (userData: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const user = await prisma.users.create({
    data: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword,
    },
  });

  return user;
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new ErrorResponse("User not found", 404);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ErrorResponse("Invalid password", 401);

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: "3d",
  });

  const data = {
    ...user,
    token,
  };
  return data;
};
