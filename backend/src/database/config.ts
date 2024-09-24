import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MOONGO_URL = process.env.MOONGO_URL || "mongodb://localhost:27017/chatDB";
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MOONGO_URL, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error to connect to DB ", error);
  }
};
