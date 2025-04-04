import { Router } from "express";
import { blogGet } from "../controllers/blogsController.js";

const blogsRouter = Router();

blogsRouter.get("/", blogGet);

export default blogsRouter;
