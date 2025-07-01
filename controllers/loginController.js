import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import jwtConfig from "../config/jwtConfig.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const prisma = new PrismaClient();

const loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and Password must not be empty" });
    }

    if (!user) {
      return res.status(400).json({ error: "Username does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const { user_id } = user;
    const tokenInfo = { user_id, username };

    jwt.sign(tokenInfo, process.env.JWT_SECRET, jwtConfig, (err, token) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "There is an error generating jwt token" });
      }
      res.status(200).json({ token });
    });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export default loginPost;
