import { Router } from "express";
import AuthController from "../controller/authController";

// Validations
import validateLogin from "../middlewares/validations/Login";
import validateRegister from "../middlewares/validations/Register";

const router = Router();

// validate email and password with express-validator
router.post("/login", validateLogin, AuthController.login);

router.post("/register", validateRegister, AuthController.register);

router.get("/renew", AuthController.renew);

export default router;
