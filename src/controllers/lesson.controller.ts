import { Request, Response } from 'express';
import { ApiResponse, LessonData } from "../types/Interfaces.js";
import { getAllLessons } from '../services/lesson.service.js';

export async function getAllLessonsController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
  const allLessons: LessonData[] = await getAllLessons();
  return res.status(200).json({
    success: true,
    message: '',
    data: allLessons,
  });
}