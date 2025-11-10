import { Request, Response  } from "express";
import { ApiResponse, CursusData, UserCursusData } from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import { addUserCursus, getAllCursusAvailable, getUsersCursusForThisUser } from "../services/user-cursus.service.js";
import { getLessonsInCursus } from "../services/lesson.service.js";
import { addUserLesson } from "../services/user-lesson.service.js";
import { addUserTheme } from "../services/user-theme.service.js";

export async function addUserCursusController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const cursusId: number = req.body.courseId;
  const requestorId = getRequestorId(req.cookies.token);
  let userId: number = req.body.userId;

  if (!userId) userId = requestorId;

  const themeId = await addUserCursus(userId, cursusId, requestorId);

  const lessonsInCursus = await getLessonsInCursus(cursusId);

  for (const lesson of lessonsInCursus) {
    await addUserLesson(userId, lesson.id, requestorId);
  }

  if (themeId) await addUserTheme(userId, themeId, requestorId);

  return res.status(200).json({
    success: true,
    message: '',
  });
}

export async function getSomeUserCursusController(req: Request, res: Response): Promise<Response<ApiResponse<UserCursusData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  const userCursusForThisUser = await getUsersCursusForThisUser(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: userCursusForThisUser,
  });
}

export async function getAllCursusAvailableController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  
  const allCursusAvailable = await getAllCursusAvailable(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: allCursusAvailable,
  })
}