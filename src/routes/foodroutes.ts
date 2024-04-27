import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getFood, getFoodCategory, getFoodSubCategory } from "../controllers/foodController";

const router = express.Router();
router.get("/all-foods", authenticate, getFood);
router.get("/food-category/:foodId", authenticate, getFoodCategory);
router.get("/food-subcategory/:categoryId", authenticate, getFoodSubCategory);

export default router;
