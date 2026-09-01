import { Log } from "../models/Log.js";
import { NewLog, StoredLog } from "../types/types.js";
import { AppError } from "../utils/AppError.js";
import { Request } from "express";


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

export async function getClientIp(req: Request) {
  console.log({
    ip: req.ip,
    ips: req.ips,
    forwarded: req.headers.forwarded,
    xForwardedFor: req.headers['x-forwarded-for'],
    cfConnectingIp: req.headers['cf-connecting-ip'],
    headers: req.headers,
  });
}

export async function createLog(log: NewLog): Promise<void> {
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