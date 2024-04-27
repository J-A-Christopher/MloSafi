const mongoose = require("mongoose");
const Food = require("./src/models/food");
const Category = require("./src/models/category");
const SubCategory = require("./src/models/subcategory");
const foodData = require("./data.json");
const dotenv = require("dotenv");

dotenv.config();
const sampleFood = foodData.map((food) => food);

const seedData = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}` || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Food.deleteMany({});
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    const categories = await Category.insertMany(
      sampleFood.map(({ category }) => category)
    );
    const subcategories = await SubCategory.insertMany(
      sampleFood.map(({ subCategory }, index) => ({
        ...subCategory,
        categoryId: categories[index]._id,
      }))
    );
    const foods = await Food.insertMany(
      sampleFood.map(
        (
          { foodId, name, imageUrl, price, description, starRating },
          index
        ) => ({
          foodId,
          name,
          imageUrl,
          price,
          description,
          starRating,
          category: categories[index]._id,
          subCategory: subcategories[index]._id,
        })
      )
    );

    console.log("Data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
