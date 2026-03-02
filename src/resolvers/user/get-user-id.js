import { userModel } from "../../model/user-model.js";
import jwt from "jsonwebtoken";

export const getUserById = async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;

    if (!token) {
      return res.status(401).json({ message: "Missing authorization token" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
