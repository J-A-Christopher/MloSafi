import { Request, Response, NextFunction } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface TypeReq extends Request {
  token?: string; // Making the token property optional
}

const stkPush = async (req: Request, res: Response, next: NextFunction) => {
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const date = new Date();
  const timeStamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const shortCode = process.env.BUSINESS_SHORT_CODE;

  const passKey = process.env.PASS_KEY;
  const password = Buffer.from(shortCode ?? "" + passKey + timeStamp).toString(
    "base64"
  );

  const token = (req as TypeReq).token; // Access token property as optional
  if (!token) {
    return res.status(400).json({ error: "Token not available" });
  }

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        // MPESA PAYBILL FOR BUSINESS SHORTCODE
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortCode,
        PhoneNumber: `254${phone}`,
        //CallBackURL: "https://f172-105-161-112-136.ngrok-free.app/callback",
        CallBackURL: "https://mydomain.com/pat",
        AccountReference: `Mlosafi`,
        TransactionDesc: "Mlosafi",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export { stkPush };
