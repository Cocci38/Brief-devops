import express from "express";
import { getDashboard } from "../controllers/administrationController.js";

const router = express.Router();

router.get("/administration/dashboard", getDashboard);

export default router;