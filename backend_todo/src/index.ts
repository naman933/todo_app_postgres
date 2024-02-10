import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index';

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", rootRouter);

app.listen(port, ()=>{
    console.log("App is running on the port : " + port);
});