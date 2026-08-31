import { Log } from "../models/Log.js";
import { NewLog, StoredLog } from "../types/types.js";
import { AppError } from "../utils/AppError.js";


export async function getAllLogs(): Promise<StoredLog[]> {
  try {
    const allLogs: StoredLog[] = await Log.find().select('-__v');
    return allLogs;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllLogs function in log service failed",
      "La récupération des logs a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function addNewLog(log: NewLog): Promise<void> {
  try {
    await Log.create(log);
  } catch (error: any) {
    throw new AppError(
      500,
      "addNewLog function in log service failed",
      "La création d'un nouveau log a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}