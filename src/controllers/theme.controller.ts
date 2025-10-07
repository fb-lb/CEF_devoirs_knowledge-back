import { Request, Response } from 'express';
import { ApiResponse, ThemeData } from "../types/Interfaces.js";
import { getAllThemes } from '../services/theme.service.js';

export async function getAllThemesController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  const allThemes: ThemeData[] = await getAllThemes();
  return res.status(200).json({
    success: true,
    message: '',
    data: allThemes,
  });
}