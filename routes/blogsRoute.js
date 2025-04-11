import { Router } from "express";
import {
  blogGet,
  blogPost,
  blogPatch,
  blogDelete,
  blogMeGet,
} from "../controllers/blogsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const blogsRouter = Router();

blogsRouter.get("/", blogGet);
blogsRouter.post("/", verifyToken, blogPost);
blogsRouter.patch("/", verifyToken, blogPatch);
blogsRouter.delete("/", verifyToken, blogDelete);
blogsRouter.get("/me", verifyToken, blogMeGet);

export default blogsRouter;
