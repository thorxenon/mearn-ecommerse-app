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
            {id: newUser._id },
            process.env.JWT_SECRET_KEY as string,
            {expiresIn:'2h'}
        );

        res.status(201);
        res.json({id: newUser.id, email, token});
    }else{
        res.status(400);
        res.json({msg: 'User already exists'});
    };
};

export const login = async(req: Request, res: Response) =>{
    let { email, password } = req.body;

    if(email && password){
        const user = await User.findOne({email});

        if(user){
            if(await bcrypt.compare(password, user.password)){
                const token = jwt.sign(
                    {id: user._id},
                    process.env.JWT_SECRET_KEY as string,
                    {expiresIn:'2h'}
                );
                return res.json({
                    token,
                    user:{
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }else{
                res.status(400).json({ msg: 'E-mail or password invalids'});
            }
        }else{
            res.status(400).json({ msg: 'E-mail or password invalids'});
        };
    };
};

export const getUser = async(req: Request, res: Response) =>{
    let payload;
    let token = req.headers['auth'];
    payload = <any>jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
    res.locals.payload = payload;
    const user = await User.findById(payload.id);
    return res.json({id: user._id, name: user.name, email: user.email });
};