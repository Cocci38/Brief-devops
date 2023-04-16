import express from "express";
import {
    getProducts,
    getProduct,
    addProduct,
    postProduct,
    putProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/produit/:id", getProduct);

router.get("/create-product", addProduct);
router.post("/create-product", postProduct);

router.put("/update-product", putProduct);

router.delete("/delete-product", deleteProduct);

export default router;