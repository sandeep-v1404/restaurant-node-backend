import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";

import menuRoutes from "./routes/menuRoutes";
import orderRoutes from "./routes/orderRoutes";
import authRoutes from "./routes/authRoutes";

import { connectMongo } from "./config/mongo";
import { connectPostgres, sequelize } from "./config/postgres";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (_, res) => {
  res.send("API Running...");
});

const start = async () => {
  await connectMongo();
  await connectPostgres();

  sequelize
    .sync()
    .then(() => {
      console.log("Postgres Database synced");
    })
    .catch((err) => {
      console.error("Failed to sync database:", err);
    });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
