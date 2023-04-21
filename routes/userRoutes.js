import express from "express";
import { postSignUp } from "../controllers/userController.js";
import { postSignIn } from "../controllers/userController.js";

const router = express.Router();

router.post("/admin/inscription", postSignUp);

router.post("/admin/connexion", postSignIn);

export default router;