import express from "express";
import cors from "cors";


const app = express();

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true,limit: '16kb'}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

import { router } from './routes/erp.routes.js'

app.use("/",router)



export default app;

