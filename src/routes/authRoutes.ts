import express from "express";
import { signup, login } from "../controllers/authController";
import { signupSchema, loginSchema } from "../validators/userSchema";
import validate from "../utils/validate";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
