import mongoose, { Document, Schema } from "mongoose";

interface OrderItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
}

interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  orderDate: Date;
}

const orderItemSchema = new Schema<OrderItem>({
  foodId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;