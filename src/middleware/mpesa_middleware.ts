import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config();

export interface RequestWithToken extends Request {
    token?: string;
  }
const generateTokenForSafaricom = async(req: RequestWithToken, res: Response, next: NextFunction) => {
    const secretKey = process.env.SAFARICOM_CONSUMER_SECRET;
    const consumerKey = process.env.SAFARICOM_CONSUMER_KEY;
    const auth = Buffer.from(`${consumerKey}:${secretKey}`).toString(
      "base64"
    );
    try {
        const response = await axios.get(
          "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
          {
            headers: {
              authorization: `Basic ${auth}`,
            },
          }
        );
        console.log(response.data.access_token);
        const token = response.data.access_token;
        req.token = token;
        next();
      } catch (e) {
        console.log(e);
      }
  
    
}

export {generateTokenForSafaricom}