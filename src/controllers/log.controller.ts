import { getAllLogs } from "../services/log.service.js";
import { Request, Response } from "express";
import { ApiResponse } from "../types/Interfaces.js";
import { StoredLog } from "../types/types.js";

export async function getAll(req: Request, res: Response): Promise<Response<ApiResponse<StoredLog[]>>> {
  const allLogs = await getAllLogs();

  return res.status(200).json({
    success: true,
    message: "",
    data: allLogs
  });
}