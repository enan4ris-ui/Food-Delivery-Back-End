import { userModel } from "../../model/user-model.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;

    jwt.verify(token, process.env.JWT_SECRET);

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const id = req.params.id;
    console.log(id);

    await userModel.findByIdAndDelete(id);

    res.send("User deleted successfully!");
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};
