const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryId: { type:  String },
  name: { type: String },
  foodId: { type:  String},
  size: { type: String, default: null },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
