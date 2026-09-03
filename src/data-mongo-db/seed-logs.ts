import mongoose from "mongoose";
import { Log } from "../models/Log.js";
import logs from './logs.json' with { type: 'json' };

const mongoUri = process.env.DATABASE_MONGO_DB_URI

try {
  if (!mongoUri) throw new Error("Environment variable DATABASE_MONGO_DB_URI is not provided");

  await mongoose.connect(mongoUri);

  await Log.deleteMany({});
  await Log.insertMany(logs);

  console.log('Logs insérés avec succès.');
} catch (error) {
  console.error(`L'insertion des logs a échoué. Voici la cause :\n${error}`);
} finally {
  await mongoose.disconnect();
}
