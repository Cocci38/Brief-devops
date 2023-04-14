import express from "express";
import {
    getCategories,
    getCategory,
    getHandCare,
    getFacialCare,
    getMakeup,
    getBodyCare,
    postCategory,
    putCategory,
    deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories", getCategories);

router.get("/soin-des-mains", getHandCare);
router.get("/soin-du-visage", getFacialCare);
router.get("/maquillage", getMakeup);
router.get("/soin-du-corp", getBodyCare);

router.get("/category/:categoryName", getCategory);

router.post("/create-category", postCategory);

router.put("/update-category", putCategory);

router.delete("/delete-category", deleteCategory);

export default router;