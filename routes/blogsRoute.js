import { Router } from "express";
import {
  blogGet,
  blogPost,
  blogPatch,
  blogDelete,
} from "../controllers/blogsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const blogsRouter = Router();

blogsRouter.get("/", blogGet);
blogsRouter.post("/", verifyToken, blogPost);
blogsRouter.patch("/", verifyToken, blogPatch);
blogsRouter.delete("/", verifyToken, blogDelete);

export default blogsRouter;
