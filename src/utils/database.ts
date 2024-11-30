import mongoose from 'mongoose';
import config from '../config/default';

// connect to the mongoDb database
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.DB_URI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};