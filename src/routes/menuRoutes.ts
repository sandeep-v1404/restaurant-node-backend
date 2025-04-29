import express from "express";
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
} from "../controllers/menuController";
import validate from "../utils/validate";
import { menuItemSchema } from "../validators/menu";

const router = express.Router();

router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", validate(menuItemSchema), createMenuItem);
router.put("/:id", validate(menuItemSchema.partial()), updateMenuItem);

export default router;
