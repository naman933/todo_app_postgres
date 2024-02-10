import express from 'express';
import userRouter from './user';
import todoRouter from './todo';
const router=express.Router();

router.use("/user", userRouter);
router.use("/todo", todoRouter);

export = router;
