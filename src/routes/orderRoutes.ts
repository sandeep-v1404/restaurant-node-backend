import express from "express";
import { createOrder, getOrdersByPhone } from "../controllers/orderController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, createOrder);
router.get("/user/:phone", authenticateUser, getOrdersByPhone);

export default router;
