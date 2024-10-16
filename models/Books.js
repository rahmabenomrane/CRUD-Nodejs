import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  auteur: { type: String, required: true },
  pages: { type: Number, required: true },
  Datepub: { type: Date, required: true },
});

export default mongoose.model("books", bookSchema);
