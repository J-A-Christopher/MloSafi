import { Request, Response } from "express";
import User from "../models/User";
import {
  generateToken,
  generateTokenForMobile,
  clearToken,
} from "../utils/auth";

const registerUser = async (req: Request, res: Response) => {
  const { fname, lname, username, email, password } = req.body;
  const userExists = await User.findOne({ email });
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
  } else {
    return res
      .status(400)
      .json({ message: "An error occurred while creating the user" });
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  if (!user!.comparePassword(password)) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  if (user && user.comparePassword(password)) {
    if (
      req.headers["user-agent"] &&
      req.headers["user-agent"].includes("Mobile")
    ) {
      const token = generateTokenForMobile(user._id, user.username, user.email);
      return res.status(200).json({ token });
    } else {
      generateToken(res, user._id, user.username, user.email);
    }
    return res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  }
};

const logOutUser = async (req: Request, res: Response) => {
  clearToken(res);
  return res.status(200).json({ message: "User logged out" });
};

export { registerUser, authenticateUser, logOutUser };
