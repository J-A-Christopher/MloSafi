import mongoose, { Document, Schema } from "mongoose";
import Food from "./Food";

interface CartItem {
  //foodId: Schema.Types.ObjectId;
  foodId: string;
  quantity: number;
}
export interface ICart extends Document {
  userId: Schema.Types.ObjectId;
  items: CartItem[];
  calculateTotalAmount(): Promise<number>;
}

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodId: {
        type: String,
        // type: Schema.Types.ObjectId,
        // ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

cartSchema.methods.calculateTotalAmount = async function (): Promise<number> {
  let totalAmount = 0;
  for (const item of this.items) {
    try {
      const foodId = item.foodId;
      const food = await Food.findOne({ foodId: foodId });
      if (food) {
        totalAmount += food.price * item.quantity;
      }
    } catch (e) {
      console.error(`Invalid foodId ${item.foodId} for item`, item);
    }
  }
  return totalAmount;
};

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
