import mongoose, { Document, Schema } from "mongoose";

export interface ISubCategory extends Document {
    subCategoryId: string;
    name?: string;
    categoryId: string;
    size: string;
}

const subCategorySchema = new Schema<ISubCategory>({
    subCategoryId: { type: String },
  name: { type: String },
  categoryId: { type: String },
  size: { type: String, default: "" },
});


const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
