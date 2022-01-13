import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const signUp = async(req: Request, res: Response) =>{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400).json({msg: "Please enter all fields"});
    }

    const findEmail = await User.findOne({email});

    if(!findEmail){
        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({name, email, password: hash});
        
        const token = jwt.sign(
            {id: newUser.id, email: newUser.email},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn:'2h'}
        );

        res.status(201);
        res.json({id: newUser.id, email, token});
    }else{
        res.status(400);
        res.json({msg: 'User already exists'});
    }
}