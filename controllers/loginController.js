import jwt from 'jsonwebtoken';
import {body, validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const validateUser = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
]

const loginPost = [ validateUser, async (req, res) => {
  const { username, password } = req.body;
  const passwordFromInput = password;

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).send({errors: errors.array()});
  }

  try{
    const user = await prisma.user.findUnique({
      where: {username: username}
    })

    if(user) {
      const {password, createdAt, ...userWithoutPassword} = user;

      if(passwordFromInput !== password){
        const error = [ {"msg": "Wrong password"} ];
        res.status(400).send({errors: error});
      }

      jwt.sign(userWithoutPassword, "secret", (err, token) => {

        if (err) {
          return res.status(500).json({error: err});
        }

        res.status(200).json({token: token});
      })

    }else{
      const error = [ {"msg": "Username does not exist"} ];
      res.status(400).send({errors: error});
    }

  }catch (e) {
    const error = [ {"msg": "There is an error retrieving data from database"} ];
    res.status(400).send({errors: error});
  }

}]

export default loginPost;