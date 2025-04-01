import {body, validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const validateBlog = [
  body("title").notEmpty().isLength({ min: 1 }).withMessage("Title is required"),
]

const blogPost =[validateBlog, async (req, res) => {
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

export {blogPost};