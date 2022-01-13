import { Schema, model, connection } from 'mongoose';

type ItemType = {
    title: string,
    description: string,
    category: string,
    price: number,
    date_added: Date
};

const schema = new Schema<ItemType>({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    date_added:{
        type: Date,
        default: Date.now
    }
});

const modelName: string = 'Item';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
:
    model<ItemType>(modelName, schema);