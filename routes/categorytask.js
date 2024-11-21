import express from "express";
import { addCategory } from "../controllers/category.js";
import { fetchcat } from "../controllers/category.js";

const router = express.Router();

// Route pour ajouter une catégorie
router.post("/", addCategory);
router.get("/", fetchcat);
export default router;
