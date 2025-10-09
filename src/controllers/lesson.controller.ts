import { Request, Response } from 'express';
import { ApiResponse, LessonData } from "../types/Interfaces.js";
import { changeOrderLessons, getAllLessons } from '../services/lesson.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';

export async function getAllLessonsController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
  const allLessons: LessonData[] = await getAllLessons();
  return res.status(200).json({
    success: true,
    message: '',
    data: allLessons,
  });
}

export async function changeOrderLessonsController(req: Request, res: Response) {
  if (!req.params.id) throw new AppError(
    400,
    'changeOrderLessonsController function in lesson controller failed : no id provided in url params',
    "Nous ne pouvons changer l'ordre des leçons, car l'identifiant de la leçon n'est pas fourni."
  )
  if (!req.params.move || (req.params.move !== 'up' && req.params.move !== 'down')) throw new AppError(
    400,
    'changeOrderLessonsController function in lesson controller failed : no move provided in url params',
    "Nous ne pouvons changer l'ordre des leçons, car le changement d'ordre (up ou down) de la leçon n'est pas fourni ou est mal défini."
  )
  
  const userId = getUserIdInRequest(req);
  const lessonId = parseInt(req.params.id);
  const response = await changeOrderLessons(lessonId, req.params.move, userId);
  if (!response.success) return res.status(400).json({ success: false, message: response.message });

  const allLessons: LessonData[] = await getAllLessons();
  return res.status(200).json({
    success: true,
    message: '',
    data: allLessons,
  });
}