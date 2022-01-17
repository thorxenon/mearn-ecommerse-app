import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart';
import Item from '../models/Item';

export const getCartItem = async(req: Request, res: Response) =>{
    let userId = req.params.id

    if(mongoose.Types.ObjectId.isValid(userId)){
        const cart = await Cart.findOne({userId});

        if(cart && cart.items.length > 0){
            res.send(cart);
        }else{
            res.status(500).send("Something went wrong");
        };
    };
};

export const addCartItem = async(req: Request, res: Response) =>{
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    if(productId && quantity){
        let cart = await Cart.findOne({userId});
        let item = await Item.findOne({_id: productId});

        if(!item){
            res.status(400).send('Item not found');
        }

        const price = item.price;
        const name = item.title;

        if(cart){
            let itemIndex = cart.items.findIndex((p:any)=>{p.productId === productId})

            if(itemIndex > -1){
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            }else{
                cart.item.push({productId, name, quantity, price});
            }

            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).json({cart})
        }else{
            const newCart = await Cart.create({
                userId,
                items:[{productId, name, quantity, price}],
                bill: quantity*price
            });
            return res.status(201).json({newCart});
        };
        
    }else{
        res.status(500).send("Something went wrong");
    };
};

export const deleteItem = async(req: Request, res: Response) =>{
    const userId = req.params.userId;
    const productId = req.params.itemId;

    try{
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex((p:any)=>{p.productId == productId});
        if(itemIndex > -1){
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch(err){
        res.status(500).send("Something went wrong");
    };
};