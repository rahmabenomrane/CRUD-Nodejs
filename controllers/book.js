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
export const validateBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    publishedYear: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
    genre: Joi.string().min(3).required(),
    author: Joi.string().required(), // Doit être un ObjectId valide
    categories: Joi.array().items(Joi.string()), // Tableau d'ObjectId valides
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

export const createValidatedBook = async (req, res) => {
  try {
    const { title, publishedYear, genre, author, categories } = req.body;

    // Vérifier si l'auteur existe
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({ message: "Auteur introuvable." });
    }

    // Vérifier si l'auteur a écrit d'autres livres
    const previousBooks = await Book.find({ author });
    if (previousBooks.length === 0) {
      return res.status(400).json({
        message: "L'auteur doit avoir écrit au moins un livre avant.",
      });
    }

    // Création du livre
    const newBook = new Book({
      title,
      publishedYear,
      genre,
      author,
      categories,
    });

    await newBook.save();

    res.status(201).json({
      message: "Livre créé avec succès.",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
