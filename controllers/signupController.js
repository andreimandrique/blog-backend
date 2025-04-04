import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const signupPost = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username cannot be empty" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password cannot be empty" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "Password and Confirm Password do not match" });
  }

  try {
    await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    res.status(201).json({ message: "You successfully signed up" });
  } catch (e) {
    res.status(500).json({ error: "Username already exist" });
  }
};

export default signupPost;
