import { Request, Response, NextFunction } from "express";
import User from "../models/User";

interface UserData extends Request {
  user?: any;
}
const getUser = async (req: UserData, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    console.log(userId);
    const user = await User.findById(userId, "username email fname");
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    next(new Error());
  }
};

export { getUser };
