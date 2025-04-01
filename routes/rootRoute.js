import {Router} from "express";
import {rootGet} from "../controllers/rootController.js";

const rootRouter = new Router();

rootRouter.get("/", rootGet);

export default rootRouter;

