import Category from "../models/Category.js";

// Ajouter une nouvelle catégorie
export const addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res
      .status(201)
      .json({ model: category, message: "Category added successfully" });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
export const fetchcat = async (req, res) => {
  try {
    const cat = await Category.find();
    res.status(200).json({ model: cat, message: "success fetch" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors", error });
  }
};