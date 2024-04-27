import mongoose, { Document, Schema } from "mongoose";

export interface IFood extends Document {
    foodId: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    starRating: number;
    category: Schema.Types.ObjectId;
    subCategory: Schema.Types.ObjectId;
}

const foodSchema = new Schema<IFood>({
    foodId: { type: String },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    starRating: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
});


const Food = mongoose.model("Food", foodSchema);
export default Food;
