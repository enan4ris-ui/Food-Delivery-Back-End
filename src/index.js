import express from "express"
import {router } from "./routes/user.js";
import mongoose from "mongoose";
import { foodRouter } from "./routes/food.js";
import { categoryModel } from "./model/category-model.js";
import { orderRouter } from "./routes/foodOrder.js";
import cors from "cors";

const app = express();
const PORT = 1000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/users", router);
app.use("/food", foodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

mongoose
  .connect("mongodb+srv://enkhlendulguun:Z3sL6WNwg3sMJgo0@food-delivery.lm3maau.mongodb.net/?appName=food-delivery")
  .then(() => console.log("Connected!"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
