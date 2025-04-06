import { Router } from "express";
import verifyGet from "../controllers/verifyController.js";

const verifyRouter = Router();

verifyRouter.get("/", verifyGet);

export default verifyRouter;
