import { Schema, model, connection } from 'mongoose';

type OrderType = {
    userId: string,
    items: [string],
    bill: number,
    date_added: Date
};

const schema = new Schema<OrderType>({
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
            min:[1, 'Quantity can not be less than 1']
        },
        price: Number
    }],
    bill:{
        type: Number,
        required: true
    },
    date_added:{
        type: Date,
        default: Date.now
    }
});

const modelName: string = 'Order';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
:
    model<OrderType>(modelName, schema);