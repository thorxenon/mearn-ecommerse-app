import { Schema, model, connection } from 'mongoose';

type CartType = {
    userId: string,
    items: [string],
    category: string,
    bill: number,
};

const schema = new Schema<CartType>({
    userId:{
        type: String,
    },
    items:[{
        productId:{
            type: String
        },
        name: String,
        quantity:{
            type: Number,
            required: true,
            min:[1, 'Quantity can not be less than 1'],
            default: 1
        },
        price: Number
    }],
    category:{
        type: String,
        required: true,
    },
    bill:{
        type: Number,
        required: true,
        default: 0
    }
});

const modelName: string = 'Cart';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
:
    model<CartType>(modelName, schema);