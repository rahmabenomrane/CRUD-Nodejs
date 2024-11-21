import Book from "../models/Books.js";
import Author from "../models/Author.js";
import Category from "../models/Category.js";

export const fetchbook = async (req, res) => {
  try {
    const books = await Book.find().populate(
      "author",
      "firstName lastName nationality"
    );
    res.status(200).json({ model: books, message: "success fetch" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

export const postbook = async (req, res) => {
  try {
    const { author, categories } = req.body;

    // Vérifiez si l'auteur existe
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Vérifiez si les catégories existent
    const existingCategories = await Category.find({
      _id: { $in: categories },
    });
    if (existingCategories.length !== categories.length) {
      return res
        .status(404)
        .json({ message: "One or more categories not found" });
    }

    // Créez le livre
    const book = new Book(req.body);
    await book.save();

    res.status(201).json({ model: book, message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
// Obtenir les informations d'un livre avec son auteur
export const getidbook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author") // Inclure l'auteur
      .populate("categories"); // Inclure les catégories dans le res

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ model: book, message: "Success get by ID" });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};


export const upbook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("author", "firstName lastName nationality");

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({ model: book, message: "update done" });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

export const delbook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
