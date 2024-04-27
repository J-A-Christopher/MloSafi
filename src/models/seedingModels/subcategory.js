const mongoose = require("mongoose");


  const { Schema } = mongoose;

  const subCategorySchema = new Schema({
    subCategoryId: { type:  String },
    name: { type: String },
    categoryId: { type: String },
    size: { type: String, default: "" },
  });

  const SubCategory = mongoose.model("SubCategory", subCategorySchema);


module.exports = SubCategory;
