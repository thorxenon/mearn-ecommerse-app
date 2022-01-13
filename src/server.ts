import express, { ErrorRequestHandler, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth';
import { mongoConnect } from './config/database';

dotenv.config();

const server = express();

mongoConnect();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(authRoute);

server.use((req, res)=>{
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});

const errorHandler: ErrorRequestHandler = (err, req, res , next) =>{
    res.status(400); //Bad request
    console.log(err);
    res.json({error: 'Ocorreu algum erro.'});
}
server.use(errorHandler);

server.listen(process.env.PORT);