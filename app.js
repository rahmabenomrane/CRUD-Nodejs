import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routerBooks from "./routes/booktask.js";
import routerAuthors from "./routes/authortask.js"; // Importation de la route des auteurs

import routerCategories from "./routes/categorytask.js";

//se connecter a la base
mongoose
  .connect("mongodb://localhost:27017/books")
  .then(function () {
    console.log("connection reussie ");
  })
  .catch(function (e) {
    console.log("connection echouée ", e);
  });


const app = express(); // Initialisation de l'application Express

app.use(cors()); // Middleware CORS pour permettre les requêtes cross-origin
app.use(express.json()); // Pour traiter les requêtes avec des données JSON

//ay req tabda b /api/tasks ab3atha ll routerTasks
app.use("/api/books", routerBooks);
app.use("/api/authors", routerAuthors); // Ajouter la route pour les auteurs

app.use("/api/categories", routerCategories);
export default app;

