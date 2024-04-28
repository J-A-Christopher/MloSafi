import express from "express";
import { addItemToCart , getCart, deleteCartItem, deleteAllCartItems} from "../controllers/cart_controller";
import { authenticate } from "../middleware/authMiddleware";
import { createOrder } from "../controllers/order_controller";
import { getUserOrders } from "../controllers/order_controller";

const router = express.Router();
router.post("/add-to-cart/:foodId", authenticate, addItemToCart);
router.get("/get-cart-details", authenticate, getCart);
//Delete specific item in the cart
router.delete("/delete-cart-item/:foodId", authenticate, deleteCartItem);
//Delete all items in the cart
router.delete("/delete-all-cart-items", authenticate, deleteAllCartItems);


export default router;