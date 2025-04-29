import { Request, Response } from "express";
import { User, Order, OrderItem } from "../models";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, items } = req.body;

    if (!user?.phone || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid order payload" });
    }

    const [dbUser] = await User.findOrCreate({
      where: { phone: user.phone },
      defaults: user,
    });
    const order = await Order.create({ userId: dbUser.id });

    const orderItems = items.map((item: any) => ({
      orderId: order.id,
      ...item,
    }));
    await OrderItem.bulkCreate(orderItems);

    const total = orderItems.reduce((sum, i) => sum + i.quantity * 1, 0); // Placeholder price logic
    order.total = total;
    await order.save();

    res.status(201).json({ orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrdersByPhone = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { phone: req.params.phone },
      include: { model: Order, include: [OrderItem] },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.Orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
