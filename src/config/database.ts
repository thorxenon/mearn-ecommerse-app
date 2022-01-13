import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async() =>{
    try{
        await connect(process.env.DB_LOCAL_URL as string);
        console.log('MongoDB conectado com sucesso...');
    }catch(error){
        console.log('Erro ao conectar ao MongoDB', error);
    }
}