import {body, validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const validateUser = [
    body("username").notEmpty().isLength({ min: 1 }).withMessage("Username is required"),
    body("password").notEmpty().isLength({ min: 1 }).withMessage("Password is required"),
    body("confirmPassword")
        .notEmpty()
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password and confirm password do not match");
            }
        }),
]

const signupPost =[ validateUser, async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }
    
    try {
         await prisma.user.create({
            data: {
                username: username,
                password: password,
            },
        })
        res.status(201).json({message: "You successfully signed up"});
    }catch (e) {
        const error = [ {"msg": "Username already exists"} ];
        res.status(500).json({errors: error});
    }

}]

export default signupPost