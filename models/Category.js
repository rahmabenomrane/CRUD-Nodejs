import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Horror", "Mystery", "Fantasy", "Romance", "Science Fiction"],
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
