import express from "express";
import { postAuthor,fetchauth } from "../controllers/author.js";

const router = express.Router();

// Route pour ajouter un auteur
router.post("/", postAuthor);
router.get("/", fetchauth);
export default router;
