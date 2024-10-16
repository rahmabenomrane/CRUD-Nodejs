import { postbook,fetchbook, getidbook, upbook, delbook } from "../controllers/book.js";
import express from "express";

const router =express.Router()

router.post("/", postbook)

router.get("/", fetchbook)

router.get("/:id", getidbook)

router.patch("/:id", upbook);

router.delete("/:id",delbook);
export default router