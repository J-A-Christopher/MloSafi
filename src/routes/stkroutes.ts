import express from "express";
import { stkPush } from "../controllers/mpesa_controller";
import { generateTokenForSafaricom } from "../middleware/mpesa_middleware";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/stk",  generateTokenForSafaricom,stkPush);

export default router;