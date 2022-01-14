import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async(req: Request, res: Response, next: NextFunction) =>{
    let success = false;
    let payload;
    const token = <string>req.headers["auth"];
        
    if(token){
        try{
            payload = <any>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            res.locals.payload = payload;
            success = true;
        }catch(err){
            return res.status(401).json({msg: 'access denied!'});
        };
    };

    if(success){
        const { userId, username } = payload;
        const newToken = jwt.sign({userId, username}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "2h"
        });
        res.setHeader('token', newToken);
        console.log(payload);
        next();
    }else{
        res.status(403)
        return res.json({error: 'Not authorized!'});
    };
};