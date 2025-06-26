import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET!, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET!, { expiresIn: "7d" });
};

export const verifyToken = (authHeader?: string) => {
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new Error("Unauthorized");
  const token = authHeader.split(" ")[1];

  return jwt.verify(token, process.env.TOKEN_SECRET!);
};
