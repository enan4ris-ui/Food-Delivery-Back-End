import express from "express";
import { getUsers } from "../resolvers/user/get-user.js";
import { createUser } from "../resolvers/user/create-user.js";
import { updateUser } from "../resolvers/user/update-user.js";
import { deleteUser } from "../resolvers/user/delete-user.js";
import {login} from "../resolvers/user/login.js";
import { getUserById } from "../resolvers/user/get-user-id.js";

export const router = express.Router();

router.get("/", getUsers);

router.get("/me", getUserById);
router.post("/", createUser);
router.put("/", updateUser);
router.post("/login", login);
router.delete("/", deleteUser);
