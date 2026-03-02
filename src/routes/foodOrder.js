import express from 'express';
import {getOrder} from "../resolvers/order/get-order.js";
import {createOrder} from "../resolvers/order/create-order.js";
import {deleteOrder} from "../resolvers/order/delete-order.js";
import { getOrderByUserId } from '../resolvers/order/get-order-by-user.js';
import { updateOrder } from '../resolvers/order/update-order.js';

export const orderRouter = express.Router();

orderRouter.get("/", getOrder);
orderRouter.get("/:userId", getOrderByUserId);
orderRouter.post("/", createOrder);
orderRouter.put("/", updateOrder);
orderRouter.delete("/", deleteOrder);
