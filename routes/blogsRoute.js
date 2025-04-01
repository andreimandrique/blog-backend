import {Router} from "express";
import {blogPost} from "../controllers/blogsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const blogsRouter = Router();

blogsRouter.post('/', verifyToken, blogPost);

export default blogsRouter;