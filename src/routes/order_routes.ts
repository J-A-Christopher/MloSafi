import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createOrder, getUserOrders } from "../controllers/order_controller";

const router = express.Router();

router.post('/create-orders', authenticate,createOrder);
router.get('/get-orders', authenticate, getUserOrders);

export default router;