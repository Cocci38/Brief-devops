import express from "express";
import {
    getProducts,
    getProduct,
    addProduct,
    postProduct,
    updateProduct,
    putProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/produit/:id", getProduct);

router.get("/create-product", addProduct);
router.post("/create-product", postProduct);

router.get("/update-product/:id", updateProduct);
router.post("/update-product", putProduct);
//router.put("/update-product", putProduct);

router.get("/delete-product/:id", deleteProduct);
router.delete("/delete-product", deleteProduct);

export default router;