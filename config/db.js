import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 5000
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Problem while connecting MongoDB:", err.message);
    });
};

export default dbConnect;