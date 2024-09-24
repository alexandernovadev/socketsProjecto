import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mongoatlas:mongoatlas@cluster0.0nyyj.mongodb.net/?retryWrites=true&w=majority",
      {}
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error to connect to DB ", error);
  }
};
