import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

const generateToken = (res: Response, userId: string,username:string,email:string) => {
    const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
    const token = jwt.sign({ userId,username, email }, jwtSecret, { expiresIn: "1h" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60*60*1000
    })
}

const generateTokenForMobile = (userId: string,username:string,email:string) => {
    const jwtSecret = process.env.jwtSecret || "defaultSecret";
    return jwt.sign({ userId, username, email }, jwtSecret, { expiresIn: "1h" });
}


const clearToken = (res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        
    });
};

export { generateToken, clearToken, generateTokenForMobile };