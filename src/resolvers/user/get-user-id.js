import { userModel } from "../../model/user-model.js";
import jwt from "jsonwebtoken";

export const getUserById = async (req, res) => {
  const token = req.headers.authorization;
  console.log("token", token);

  const { id } = jwt.verify(token, "secret-key");
  const users = await userModel.findById({ _id: id });

  res.status(200).json(users);
};
