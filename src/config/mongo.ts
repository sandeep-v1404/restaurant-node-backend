import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";
    console.log("mongoUri", mongoUri);
    await mongoose.connect(mongoUri);

    console.log(`MongoDB connected @ ${mongoUri}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};
