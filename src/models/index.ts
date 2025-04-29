import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres";
import User from "./User";

export const Order = sequelize.define("Order", {
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  total: DataTypes.FLOAT,
});

export const OrderItem = sequelize.define("OrderItem", {
  item_id: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
});

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
