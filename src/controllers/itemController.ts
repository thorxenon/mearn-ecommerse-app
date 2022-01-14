import { Request, Response } from 'express';
import Item from '../models/Item';

export const getItems = async(req: Request, res: Response) =>{
    const items = await Item.find().sort({date:-1});

    if(items){
        return res.json({items});
    };
}

export const postItem = async(req: Request, res: Response) =>{
    const newItem = new Item(req.body);
    newItem.save();
    res.json({newItem});
}

export const updateItem = async(req: Request, res: Response) =>{
    const itemUpdated = await Item.findById(req.params.id).update(req.body);
    res.json({});
};

export const deleteItem = async(req: Request, res: Response) =>{
    const item = await Item.findByIdAndDelete({_id: req.params.id});
    res.json({success: true});
};