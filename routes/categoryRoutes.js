import express from "express";
import {
    getCategories,
    getCategory,
    // getHandCare,
    // getFacialCare,
    // getMakeup,
    // getBodyCare,
    postCategory,
    putCategory,
    deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories", getCategories);

// router.get("/beaute-des-mains", getCategory);
// router.get("/soin-du-visage", getCategory);
// router.get("/maquillage", getCategory);
// router.get("/soin-du-corps", getCategory);

router.get("/:categoryName", getCategory);

router.post("/create-category", postCategory);

router.put("/update-category", putCategory);

router.get("/delete-category/:_id", deleteCategory);
router.delete("/delete-category", deleteCategory);

export default router;