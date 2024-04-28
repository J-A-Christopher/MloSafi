import { Request, Response, NextFunction } from "express";
import Cart from "../models/cart_model";

interface UserData extends Request {
  user?: any;
}
const addItemToCart = async (
  req: UserData,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const foodId = req.params.foodId;
    const existingCart = await Cart.findOne({
      userId: userId,
      "items.foodId": foodId,
    });
    if (existingCart) {
      await Cart.updateOne(
        { userId: userId, "items.foodId": foodId },
        { $inc: { "items.$.quantity": 1 } }
      );
    } else {
      const newCartItem = {
        foodId: foodId,
        quantity: 1,
      };
      await Cart.findOneAndUpdate(
        { userId: userId },
        { $push: { items: newCartItem } },
        { upsert: true }
      );
    }
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (e) {
    console.log(e);
    next(new Error());
  }
};

//Delete specific item in the cart 
const deleteCartItem = async (req: UserData, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const foodId = req.params.foodId;
    const result = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { items: { foodId: foodId } } }
    );
    
    if (!result) {
      return res.status(404).json({ message: "Can not delete item; Item not found" });
    } else {
      return res.status(200).json({ message: "Successfully deleted item" });
    }
  } catch (e) {
    console.error(e);
    next(new Error());
  }
};


const getCart = async (req: UserData, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId: userId }).populate(
      "items.foodId"
    );
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    const totalAmount = await cart.calculateTotalAmount();
    res.status(200).json({ cart, totalAmount });
  } catch (e) {
    console.log(e);
    next(new Error());
  }
};

const deleteAllCartItems = async (req: UserData, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
  
    
    // Find the cart item to delete
    const itemToDelete = await Cart.findOne({ userId: userId});
    
    if (!itemToDelete) {
      return res.status(404).json({ message: "Can not delete item; Item not found" });
    } else {
      // Delete the cart item
      await Cart.findOneAndDelete({ userId: userId});
      return res.status(200).json({ message: "Successfully deleted item" });
    }
  } catch (e) {
    console.error(e);
    next(new Error());
  }
};


export { addItemToCart, getCart, deleteCartItem , deleteAllCartItems};
