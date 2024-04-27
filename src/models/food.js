const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema({
  foodId: { type:String },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  starRating: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;