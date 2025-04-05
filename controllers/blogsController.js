import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogGet = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
      },
    });
    res.status(200).json({ blogs: blogs });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const blogPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title cannot be empty" });
  }
  try {
    await prisma.blog.create({
      data: {
        title: title,
        content: content,
        author_id: Number(req.user.user_id),
      },
    });
    res.status(201).json({ message: "Blog successfully created" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const blogPatch = async (req, res) => {
  const { blog_id, title, content, published } = req.body;

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        blog_id: blog_id,
      },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog do not exist" });
    }

    if (blog["author_id"] !== req.user.user_id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to edit this blog" });
    }

    await prisma.blog.update({
      where: {
        blog_id: blog_id,
      },
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
    res.status(200).json({ message: "You successfully updated the blog" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const blogDelete = async (req, res) => {
  const { blog_id } = req.body;
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        blog_id: blog_id,
      },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog do not exist" });
    }

    if (blog["author_id"] !== req.user.user_id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this blog" });
    }
    await prisma.blog.delete({
      where: {
        blog_id: blog_id,
      },
    });
    res.status(200).json({ message: "You successfully delete this blog" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export { blogGet, blogPost, blogPatch, blogDelete };
