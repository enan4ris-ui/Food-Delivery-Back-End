import express from "express";
import { router } from "./routes/user.js";
import mongoose from "mongoose";
import { foodRouter } from "./routes/food.js";
import { categoryRouter } from "./routes/category.js";
import { orderRouter } from "./routes/foodOrder.js";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 1000;
const mongoUri = process.env.MONGO_URI;
const mongoUriStandard = process.env.MONGO_URI_STANDARD;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/users", router);
app.use("/food", foodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

if (!mongoUri) {
  throw new Error("MONGO_URI is not set in .env");
}

const isSrvDnsError = (error) => {
  const message = error?.message || "";
  return (
    message.includes("querySrv") ||
    message.includes("ENOTFOUND") ||
    message.includes("EAI_AGAIN") ||
    message.includes("ECONNREFUSED")
  );
};

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB (SRV URI)");
    return;
  } catch (error) {
    if (!mongoUriStandard || !isSrvDnsError(error)) {
      throw error;
    }

    console.warn("SRV connection failed, retrying with standard URI...");

    await mongoose.connect(mongoUriStandard);
    console.log("Connected to MongoDB (standard URI)");
  }
};

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
