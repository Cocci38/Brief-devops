import express from "express";
import {
    getProducts,
    getProduct,
    addProduct,
    postProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/product/:id", getProduct);

router.get("/create-product", addProduct);

router.post("/create-product", postProduct);

export default router;