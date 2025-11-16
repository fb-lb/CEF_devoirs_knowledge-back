import { Request, Response } from "express";
import { ApiResponse, LessonData, UserLessonData } from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import { addUserCursus } from "../services/user-cursus.service.js";
import { addUserTheme } from "../services/user-theme.service.js";
import { addUserLesson, deleteUserLesson, getAllLessonsAvailable, getAllUserLessonData, getUsersLessonsForThisUser, updateUserLesson } from "../services/user-lesson.service.js";
import { AppError } from "../utils/AppError.js";
import { validateUpdateUserLessonForm } from "../services/form.service.js";

export async function addUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const lessonId: number = Number(req.body.courseId);
  const requestorId = getRequestorId(req.cookies.token);
  let userId: number = Number(req.body.userId);

  if (!userId) userId = requestorId;

  const cursusId = await addUserLesson(userId, lessonId, requestorId);

  if (!cursusId) {
    return res.status(200).json({
      success: false,
      message: "L'utilisateur a déjà accès à cette leçon.",
    });
  }

  let themeId: number | null = null;

  themeId = await addUserCursus(userId, cursusId, requestorId);

  if (themeId) await addUserTheme(userId, themeId, requestorId);

  return res.status(200).json({
    success: true,
    message: "L'utilisateur a maintenant accès à cette leçon.",
  });
}

export async function getAllUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse<UserLessonData>>> {
  const allUserLessonData = await getAllUserLessonData(); 
  
  return res.status(200).json({
    success: true,
    message: '',
    data: allUserLessonData,
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

export async function updateUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse>> {  
  const userLessonId = Number(req.params.userLessonId);
  const isValidated = req.body.updateUserLessonValidation === true || req.body.updateUserLessonValidation === 'true' ? true : false;
  const requestorId = getRequestorId(req.cookies.token);

  validateUpdateUserLessonForm(userLessonId, requestorId);

  const hasUserLessonValidationChanged = await updateUserLesson(userLessonId, requestorId, isValidated);

  if (hasUserLessonValidationChanged) {
    return res.status(200).json({
      success: true,
      message: `L'association utilisateur / leçon a bien été ${isValidated ? 'validée' : 'invalidée'}.`,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: `L'association utilisateur / leçon est déjà ${isValidated ? 'validée' : 'invalidée'}.`,
    });
  }
}

export async function deleteUserLessonController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const userLessonId = Number(req.params.userLessonId);
  if (!userLessonId || Number.isNaN(userLessonId)) throw new AppError(
    422,
    "deleteUserLessonController function in user-lesson controller failed : userLessonId has to be a number in url parameter",
    "L'identifiant de l'association utilisateur / leçon n'est pas fourni ou n'est pas un nombre. Impossible de supprimer cette association."
  );

  const requestorId = getRequestorId(req.cookies.token);

  await deleteUserLesson(userLessonId, requestorId);

  return res.status(200).json({
    success: true,
    message: "L'association utilisateur / leçon a bien été supprimée.",
  });
}