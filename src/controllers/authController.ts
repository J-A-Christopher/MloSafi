import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import {
  generateToken,
  clearToken,
} from "../utils/auth";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fname, lname, username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  try {
    if (userExists) {
      return res.status(400).json({ message: "The user already exists" });
    }
    const user = await User.create({ fname, lname, username, email, password });
    if (user) {
      return res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ message: "An error occurred while creating the user" });
  }
};

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (user && user.comparePassword(password)) {
      const isMobile = req.useragent && req.useragent.isMobile;
      console.log(!isMobile);
      console.log("User-Agent:", req.headers["user-agent"]);
      const token = generateToken(user._id, user.username, user.email);

      return res.status(201).json({ token });
    }
  } catch (e) {
    next(new Error());
  }
};

const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    clearToken(res);
    return res.status(200).json({ message: "User logged out" });
  } catch (e) {
    next(new Error());
  }
};

export { registerUser, authenticateUser, logOutUser };
