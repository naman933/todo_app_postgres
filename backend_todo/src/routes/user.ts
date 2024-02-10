import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import {createUser} from '../db/user';
import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

const signupBody = zod.object({
    username: zod.string().email(),
	password: zod.string(),
    name: zod.string()
})

const router = express.Router();


router.post("/signup", async( req : any , res: any) =>{
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await prisma.user.findFirst({
        where : {
            username : req.body.username
        }
    })

    if (existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const {username, password, name} = req.body;

    const user = await createUser(username, password, name);

    const userId = user.id;

    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await prisma.user.findFirst({
        where : {
            username: req.body.username,
            password: req.body.password
        }
    });

    if (user) {
        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET);
  
        res.json({
            message: "Log in successful",
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

export = router ;
