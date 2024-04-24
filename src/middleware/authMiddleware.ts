import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./errorMiddleware";
import dotenv from "dotenv";

dotenv.config();
interface AuthenticatedRequest extends Request {
  user?: any;
}
const authenticate = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      let token = req.cookies.jwt;

      if (!token) {
        res.status(401);
        throw new AuthenticationError("Token not found");
      }
      const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      if (!decoded || !decoded.userId) {
        res.status(401);
        throw new AuthenticationError("UserId not found");
      }
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(401);
        throw new AuthenticationError("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      throw new AuthenticationError("Invalid token");
    }
  }
);

export { authenticate };
