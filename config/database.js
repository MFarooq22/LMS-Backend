import mongoose from "mongoose";
const URI = process.env.MONGO_URI;

export const connectDB = async() => {
    try {
        await mongoose.connect(URI);
        console.log("DB Connected!");
    } catch (error) {
        console.error("db connection failed!", error);
        process.exit(0);
    }
}

