import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_MONGO_DB_URI);
    console.log('Connected to the knowledge logs database');
  } catch (err) {
    console.error('Connection error to the knowledge logs databse : ', err);
  }
}
