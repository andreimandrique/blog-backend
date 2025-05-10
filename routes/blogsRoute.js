import { Router } from "express";
import {
  blogGet,
  blogMeGet,
  blogMeBlogIdGet,
  blogBlogIdGet,
  blogPost,
  blogPatch,
  blogDelete,
} from "../controllers/blogsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const blogsRouter = Router();

blogsRouter.get("/", blogGet);
blogsRouter.get("/me", verifyToken, blogMeGet);
blogsRouter.get("/me/:blogId", verifyToken, blogMeBlogIdGet);
blogsRouter.get("/:blogId", blogBlogIdGet);
blogsRouter.post("/", verifyToken, blogPost);
blogsRouter.patch("/", verifyToken, blogPatch);
blogsRouter.delete("/", verifyToken, blogDelete);

export default blogsRouter;
