import { Request, Response } from "express";
import { ApiResponse, LessonData, UserLessonData } from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import { addUserCursus } from "../services/user-cursus.service.js";
import { addUserTheme } from "../services/user-theme.service.js";
import { addUserLesson, getAllLessonsAvailable, getUsersLessonsForThisUser, updateUserLessonValidation } from "../services/user-lesson.service.js";
import { AppError } from "../utils/AppError.js";

export async function addUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const lessonId: number = Number(req.body.courseId);
  const requestorId = getRequestorId(req.cookies.token);
  let userId: number = Number(req.body.userId);

  if (!userId) userId = requestorId;

  const cursusId = await addUserLesson(userId, lessonId, requestorId);

  let themeId: number | null = null;

  if (cursusId) themeId = await addUserCursus(userId, cursusId, requestorId);

  if (themeId) await addUserTheme(userId, themeId, requestorId);

  return res.status(200).json({
    success: true,
    message: '',
  });
}

export async function getSomeUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse<UserLessonData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  const userLessonsForThisUser = await getUsersLessonsForThisUser(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: userLessonsForThisUser,
  });
}

export async function getAllLessonsAvailableController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  
  const allLessonsAvailable = await getAllLessonsAvailable(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: allLessonsAvailable,
  });
}

export async function validateUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const lessonId = Number(req.params.lessonId);

  if(!lessonId) throw new AppError(
    422,
    "validateLessonController function in lesson controller failed: no/bad lesson id provided",
    "L'identifiant de la leçon en paramètre d'url n'est pas valide"
  );

  const requestorId = getRequestorId(req.cookies.token);

  await updateUserLessonValidation(lessonId, requestorId, true);

  return res.status(200).json({
    success: true,
    message: 'La leçon a bien été validée.',
  })
}

export async function invalidateUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const lessonId = Number(req.params.lessonId);

  if(!lessonId) throw new AppError(
    422,
    "validateLessonController function in lesson controller failed: no/bad lesson id provided",
    "L'identifiant de la leçon en paramètre d'url n'est pas valide"
  );

  const requestorId = getRequestorId(req.cookies.token);

  await updateUserLessonValidation(lessonId, requestorId, false);

  return res.status(200).json({
    success: true,
    message: 'La leçon a bien été invalidée.',
  })
}