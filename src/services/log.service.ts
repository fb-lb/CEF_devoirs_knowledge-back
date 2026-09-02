import { Log } from "../models/Log.js";
import { NewLog, StoredLog } from "../types/types.js";
import { AppError } from "../utils/AppError.js";
import { Request } from "express";

/**
 * Retrieve all logs in NoSQL database
 * 
 * @async
 * @function getAllLogs
 *  
 * @returns {Promise<StoredLog[]>} A list of objects containing logs data
 * 
 * @throws {AppError} If an unexpected error occurs during the log retrieval.
 */
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

/**
 * Retrieve client IP address
 * 
 * @function getClientIp
 * 
 * @param {Request} req - The HTTP request containing the client IP address
 * 
 * @returns {string} The client ip address or 'IP_NOT_AVAILABLE' if IP address isn't retrieved
 */
export function getClientIp(req: Request): string {
  const cfIp = req.headers['cf-connecting-ip'];
  if (typeof cfIp === 'string') return cfIp;

  const trueClientIp = req.headers['true-client-ip'];
  if (typeof trueClientIp === 'string') return trueClientIp;

  return req.ip ?? 'IP_NOT_AVAILABLE';
}

/**
 * Create a new log in the NoSQL database
 * 
 * @async
 * @function createLog
 * 
 * @param {NewLog} log - The log to add to the database
 * 
 * @returns {Promise<boolean>} — true if log is created, false otherwise
 */
export async function createLog(log: NewLog): Promise<boolean> {
  try {
    await Log.create(log);
    return true;
  } catch (error: any) {
    console.error("createLog function in log service failed");
    console.error(error);
    console.error(`Failed to log ${ log.event }`);
    return false;
  }
}