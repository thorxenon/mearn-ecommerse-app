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

/*export const updateItem = async(req: Request, res: Response) =>{
    const updateItem = await Item.findByIdAndUpdate(req.params.id,{req.params: req.body}, req.body ).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json({item})
        })
    })
}*/

export const deleteItem = async(req: Request, res: Response) =>{
    const item = await Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
};