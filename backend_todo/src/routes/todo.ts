import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import {createTodo, updateTodo , getTodos} from '../db/todo';
import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
import { authMiddleware } from "../middleware/auth";

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

const router = express.Router();

const todoBody = zod.object({
    userId : zod.number(),
    title : zod.string(),
    description : zod.string()
})

router.post("/createTodo", authMiddleware, async(req, res)=>{
    const {success } = todoBody.safeParse(req.body);
    if (!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const { userId, title, description} = req.body;

    const todo = createTodo(userId, title, description);

    res.json({
        message: "Todo created successfully",
    })
})

router.put("/updateTodo", authMiddleware, async(req, res)=>{
    const todo = await updateTodo(req.body.id);
    res.json({
        message: "Todo updated successfully",
    })
})

router.get("/getTodos", authMiddleware, async(req, res)=>{
    const todos = await getTodos(req.body.userId);

    res.json({
        todo : todos.map(todo =>{
            return ({
            id : todo.id,
            userId : todo.userId,
            title: todo.title,
            description: todo.description,
            done: todo.done
            })
        })
    })
})


export = router;