import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.status(400).json({ error: "Username does not exist" });
    }

    if (user["password"] !== password) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const { user_id } = user;
    const tokenInfo = { user_id, username };

    jwt.sign(tokenInfo, "secret", (err, token) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "There is an error generating jwt token" });
      }
      res.status(200).json({ token });
    });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export default loginPost;
