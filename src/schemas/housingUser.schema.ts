import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.number().int().positive("Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  profilePic: z.string().optional(),
  isVerified: z.boolean().default(false),
  verifyToken: z.string().optional(),
  verifyTokenExpiry: z.date().optional(),
});

export type UserValidationSchema = z.infer<typeof userSchema>;
