import { Request, Response } from 'express';
import { ApiResponse, LessonData } from "../types/Interfaces.js";
import { addLesson, changeOrderLessons, deleteLesson, getAllLessons } from '../services/lesson.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { validateAddLessonForm } from '../services/form.service.js';
import { getRequestorId } from '../services/token.service.js';

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

export async function addLessonController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
  const lessonName: string = req.body.name;
  const cursusId: number = req.body.cursusId;
  const price: number = req.body.price;
  validateAddLessonForm(lessonName, cursusId, price);

  const requestorId = getRequestorId(req.cookies.token);

  let allLessons = await getAllLessons();
  let selectedLessons: LessonData[] = [];
  for (const lesson of allLessons) {
    if (lesson.cursusId === cursusId) selectedLessons.push(lesson);
  }
  
  await addLesson(lessonName, price, selectedLessons, requestorId, cursusId);

  allLessons = await getAllLessons();

  return res.status(200).json({
    success: true,
    message: `La leçon ${lessonName} a bien été ajoutée`,
    data: allLessons,
  });
}

export async function deleteLessonController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
    if(!req.params.id) throw new AppError(
    422,
    'deleteLessonController function in lesson controller failed : no id provided in url parameter',
    "La leçon n'a pas pu être retrouvée car son identifiant n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );

  const lessonId = parseInt(req.params.id);
  await deleteLesson(lessonId);

  const allLessons = await getAllLessons();
  return res.status(200).json({
    success: true,
    message: 'La leçon a bien été supprimée.',
    data: allLessons,
  });
}