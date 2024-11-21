import Author from "../models/Author.js";

export const fetchauth = async (req, res) => {
  try {
   const authors = await Author.find();
    res.status(200).json({ model: authors, message: "success fetch" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors", error });
  }
};
export const postAuthor = async (req, res) => {
  try {
    const { lastName, firstName, nationality } = req.body;

    // Validation basique
    if (!lastName || !firstName || !nationality) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Création d'un nouvel auteur
    const author = new Author({ lastName, firstName, nationality });
    await author.save();

    res
      .status(201)
      .json({ model: author, message: "Author added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error adding author.", error });
  }
};
