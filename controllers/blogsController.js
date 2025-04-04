import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogGet = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
      },
    });
    res.status(200).json({ blogs: blogs });
  } catch (e) {
    res.status(500).json({ errors: e });
  }
};

export { blogGet };
