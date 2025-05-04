import { Router } from "express";
import {
  blogGet,
  blogBlogIdGet,
  blogPost,
  blogPatch,
  blogDelete,
  blogMeGet,
  blogMeBlogIdGet
} from "../controllers/blogsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const blogsRouter = Router();

blogsRouter.get("/", blogGet);
blogsRouter.get("/:blogId", blogBlogIdGet);
blogsRouter.post("/", verifyToken, blogPost);
blogsRouter.patch("/", verifyToken, blogPatch);
blogsRouter.delete("/", verifyToken, blogDelete);
blogsRouter.get("/me", verifyToken, blogMeGet);
blogsRouter.get("/me/:blogId", verifyToken, blogMeBlogIdGet);
export default blogsRouter;
