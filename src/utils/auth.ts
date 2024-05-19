import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

const generateToken = (
  userId: string,
  username: string,
  email: string
) => {
  const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
  return jwt.sign({ userId, username, email }, jwtSecret, {
    expiresIn: "1h",
  });
};

const clearToken = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { clearToken, generateToken };
//generateToken,
