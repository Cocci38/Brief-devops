import express from "express";
import { getHomepage } from "../controllers/homepageController.js";

const router = express.Router();

router.get("/", getHomepage);

export default router;