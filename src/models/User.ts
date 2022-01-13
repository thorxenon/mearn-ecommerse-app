import { Schema, model, connection } from 'mongoose';
import validator from 'validator';

type UserType = {
    name: string,
    email: string,
    password: string,
    register_date: Date,
};

const schema = new Schema<UserType>({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:[true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validator:[validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a valid password'],
        minLength: [6, 'Minumum password length must be 6 characters']
    },
    register_date:{
        type: Date,
        default: Date.now
    }
});

const modelName: string = 'User';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
:
    model<UserType>(modelName, schema);