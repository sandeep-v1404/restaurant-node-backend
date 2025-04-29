import { Request, Response } from "express";
import MenuItem from "../models/MenuItem";

export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const items = category
      ? await MenuItem.find({ category })
      : await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Menu item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Invalid menu item data" });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Menu item not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid update data" });
  }
};
