import express, { Request, Response,ErrorRequestHandler, urlencoded, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import routesApi from './routes/standard';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(routesApi);

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