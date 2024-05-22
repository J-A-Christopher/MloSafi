import { Request, Response, NextFunction, RequestHandler } from "express";
import Food, { IFood } from "../models/Food";
import Category from "../models/Category";
import SubCategory from "../models/Subcategory";

const getFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const food = await Food.find().populate("category").populate("subCategory");
    res.status(200).json({ food });
  } catch (e) {
    next(new Error());
  }
};

const getFoodCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foodId = req.params.foodId;
    const foodCatData = await Category.findOne({ foodId: foodId });

    if (foodCatData) {
      return res.status(200).json({ foodCatData });
    } else {
      return res.status(400).json({ message: "Food not found" });
    }
  } catch (e) {
    console.log(e);
    next(new Error());
  }
};

const getFoodSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryData = await SubCategory.findOne({ categoryId });
    if (categoryData) {
      return res.status(200).json({ categoryData });
    } else {
      return res.status(400).json({ message: "Subcategory not found" });
    }
  } catch (e) {
    console.log(e);
    next(new Error());
  }
};

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: string = req.query.q as string;
    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ message: "Query parameter is missing or empty" });
    }
    const searchResults: IFood[] = await Food.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).populate("category");
    res.json({ results: searchResults });
  } catch (error) {
    next(new Error());
  }
};

export { getFood, getFoodCategory, getFoodSubCategory, search };
