import { Request, Response, NextFunction } from "express";
import Order from "../models/order_model";
import Cart from "../models/cart_model";
import { CartItem } from "../models/cart_model";
import Food from "../models/Food";

interface UserData extends Request {
  user?: any;
}

// Create a new order
 const createOrder = async (
  req: UserData,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.foodId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = await Promise.all(
      cart.items.map(async (item: CartItem) => {
        const foodItem = await Food.findOne({ foodId: item.foodId });
        return {
          foodId: foodItem?._id.toString(),
          name: foodItem?.name,
          price: foodItem?.price,
          quantity: item.quantity,
        };
      })
    );

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + (item.price ?? 0) * item.quantity,
      0
    );

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
    });

    await newOrder.save();
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.log(err);
    next(new Error());
  }
};

// Get all orders for a user
 const getUserOrders = async (
  req: UserData,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId });

    res.status(200).json({ orders });
  } catch (err) {
    next(new Error());
  }
};

export {createOrder, getUserOrders}