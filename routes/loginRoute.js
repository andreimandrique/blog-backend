import {Router} from 'express'
import loginPost from "../controllers/loginController.js";

const loginRouter = new Router();

loginRouter.post("/", loginPost);

export default loginRouter;