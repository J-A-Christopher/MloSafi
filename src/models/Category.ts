import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  categoryId: string;
  name: string;
  foodId: string;
  size?: string | null;
}

const categorySchema = new Schema<ICategory>({
    categoryId: { type: String },
    name: { type: String },
    foodId: { type: String },
    size: { type: String, default: null },
});


const Category = mongoose.model("Category", categorySchema);
export default Category;
