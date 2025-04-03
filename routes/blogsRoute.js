import {Router} from "express";
import {blogGet,blogPost, blogPatch} from "../controllers/blogsController.js";

const blogsRouter = Router();

blogsRouter.get('/', blogGet);
blogsRouter.post('/', blogPost);
blogsRouter.patch('/', blogPatch);


export default blogsRouter;