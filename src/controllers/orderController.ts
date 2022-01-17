import { Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import User from '../models/User';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

dotenv.config();

export const getOrders = async(req: Request, res: Response) =>{
    const userId = req.params.id;
    await Order.find({userId}).sort({date:-1}).then(orders => res.json({orders}));
}

export const checkout = async(req: Request, res: Response) =>{
    const token = req.body.token;
    let payload = <any>jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    res.locals.payload = payload;;

    try{
        const userId = req.params.id;
        const { source } = req.body;
        let cart = await Cart.findOne({userId});
        let user = await User.findOne({_id: userId});
        const email = user.email;

        if(cart){
            const stripe = new Stripe(process.env.STRIPE_API_KEY_SECRET as string, {
                apiVersion:'2020-08-27',
                appInfo: { // For sample support and debugging, not required for production:
                    name: "stripe-samples/accept-a-payment",
                    url: "https://github.com/stripe-samples",
                    version: "0.0.2",
                },
                typescript: true
            });

            const charge: Stripe.PaymentIntentCreateParams ={
                amount: cart.bill,
                currency:'inr',
                receipt_email:email
            }

            if(!charge) throw Error('Payment failed');
            if(charge){
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                });
                const data = await Cart.findOneAndDelete({_id: cart.id});
                return res.status(201).json({order});
            }
        }else{
            res.status(500).json({error:"You do not have items in cart"});
        }
    }catch(err){
        res.status(500).send("Something went wrong");
    }
}