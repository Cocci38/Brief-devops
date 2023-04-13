import express from "express";
import {
    getProducts,
    postProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);

router.post("/create-product", postProduct);

export default router;