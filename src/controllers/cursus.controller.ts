import { Request, Response } from 'express';
import { ApiResponse, CursusData } from "../types/Interfaces.js";
import { getAllCursus } from '../services/cursus.service.js';

export async function getAllCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  const allCursus: CursusData[] = await getAllCursus();
  return res.status(200).json({
    success: true,
    message: '',
    data: allCursus,
  });
}