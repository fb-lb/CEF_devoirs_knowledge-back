import { Request, Response } from "express";
import { ApiResponse, UserLessonData } from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import { addUserCursus } from "../services/user-cursus.service.js";
import { addUserTheme } from "../services/user-theme.service.js";
import { addUserLesson, getUsersLessonsForThisUser } from "../services/user-lesson.service.js";

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