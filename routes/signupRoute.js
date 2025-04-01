import {Router} from "express";
import signupPost from "../controllers/signupController.js";

const signupRouter = new Router();

signupRouter.post("/", signupPost);

export default signupRouter;
