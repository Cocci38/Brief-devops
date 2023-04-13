import express from "express";
import {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories", getCategories);

router.get("/category/:id", getCategory);

router.post("/create-category", postCategory);

router.put("/update-category", putCategory);

router.delete("/delete-category", deleteCategory);

export default router;