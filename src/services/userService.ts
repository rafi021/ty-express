import prisma from "../DB/db.config";
import { User } from "./../types/user";

export const getUserByEmail = async (email: string) => {
  return prisma.users.findFirst({ where: { email } });
};

export const getUserById = async (id: number) => {
  return prisma.users.findFirst({ where: { id } });
};
