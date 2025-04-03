import {body, validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";
import verifyToken from "../middlewares/verifyToken.js";

const prisma = new PrismaClient();

const blogGet = async (req, res) => {
  try{
    const blogs = await prisma.blog.findMany();
    res.status(200).json({blogs: blogs});
  }catch (e) {
    const error = [ {"msg": "There is an error getting the blog" } ];
    res.status(500).json({errors: error});
  }
}

const validateBlog = [
  body("title").notEmpty().isLength({ min: 1 }).withMessage("Title is required"),
]

const blogPost =[verifyToken, validateBlog, async (req, res) => {
    const {title, content} = req.body;
    const {user_id} = req.user;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    try{
      await prisma.blog.create({
        data: {
          title: title,
          content: content,
          author_id: user_id
        },
      });
        res.status(201).json({message: "You successfully create a blog"});
    }catch (e) {
        const error = [ {"msg": "There is an error creating the blog" } ];
        res.status(500).json({errors: error});
    }

}]

const blogPatch =[verifyToken, validateBlog, async (req, res) => {
  const {blog_id,title, content} = req.body;
  const {user_id} = req.user;

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).send({errors: errors.array()});
  }

  try{
    const blog = await prisma.blog.findUnique({
      where: {
        blog_id: blog_id,
      }
    })
    if(!blog) {
      const error = [ {"msg": "This blog do not exist" } ];
      return res.status(404).json({errors: error});
    }
    if(blog['author_id'] !== user_id) {
      const error = [ {"msg": "You don't have permission to update this blog" } ];
      return res.status(403).json({errors: error});
    }
    await prisma.blog.update({
      where: {
        blog_id: blog_id,
      },data:{
        title: title,
        content: content,
      }
    })
    res.status(201).json({message: "You successfully updated the blog"});
  }catch (e) {
    const error = [ {"msg": "There is an error updating the blog" } ];
    res.status(500).json({errors: error});
  }
}]

export {blogGet, blogPost, blogPatch};