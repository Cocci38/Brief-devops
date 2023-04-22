import express from "express";
//import { postSignUpAdmin } from "../controllers/userController.js";
import { getSignIn } from "../controllers/userController.js";
import { postSignIn } from "../controllers/userController.js";
import { logout } from "../controllers/userController.js";

const router = express.Router();

//router.post("/admin/inscription", postSignUpAdmin);

router.get("/admin/connexion", getSignIn);
router.post("/admin/connexion", postSignIn);

router.get("/admin/deconnexion", logout)

export default router;