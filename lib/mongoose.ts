import mongoose, { mongo } from 'mongoose';

let isConnected = false; // tracks connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

    if(isConnected) return console.log('=> using existing database connection');

    //If not connected and have valid mongoDB credentials (URI)
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB Connected');

        
    } catch (error) {
        console.log(error);
        
    }



}