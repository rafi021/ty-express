import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1).max(191),
  email: z.string().email(),
  password: z.string().min(4),
  phone: z.string().min(11).max(20).nullable(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
