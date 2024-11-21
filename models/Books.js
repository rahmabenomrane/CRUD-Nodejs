import mongoose from "mongoose";
0
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  genre: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  }, // Référence à l'auteur
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], //tab Références multiples à des catégories
});
export default mongoose.model("books", bookSchema);
