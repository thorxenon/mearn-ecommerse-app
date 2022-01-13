import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = async(req: Request, res: Response, next: NextFunction) =>{
    const token = req.header('x-auth-token');

    //verify json token
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied.'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JTW_SECRET_KEY as string );

        //adding user from payload
        //req.body.user = decoded;
        next();
    }catch(e){
        res.status(400).json({msg:'Token is not valid.'});
    }
}