import { Request, Response  } from "express";
import { ApiResponse, CursusData, UserCursusData } from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import { addUserCursus, checkUserAccessAllLessonsInCursus, deleteUserCursus, getAllCursusAvailable, getAllUserCursusData, getUsersCursusForThisUser, updateUserCursus } from "../services/user-cursus.service.js";
import { getLessonsInCursus } from "../services/lesson.service.js";
import { addUserLesson } from "../services/user-lesson.service.js";
import { addUserTheme } from "../services/user-theme.service.js";
import { validateUpdateUserCursusForm } from "../services/form.service.js";
import { AppError } from "../utils/AppError.js";

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
    message: "L'association utilisateur/cursus a bien été ajoutée avec toutes les leçons incluses.",
  });
}

export async function getAllUserCursusController(req: Request, res: Response): Promise<Response<ApiResponse<UserCursusData>>> {
  const allUserCursusData = await getAllUserCursusData(); 
  
  return res.status(200).json({
    success: true,
    message: '',
    data: allUserCursusData,
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

export async function updateUserCursusController(req: Request, res: Response): Promise<Response<ApiResponse>> {  
  const userCursusId = Number(req.params.userCursusId);
  const isValidated = req.body.updateUserCursusValidation === true || req.body.updateUserCursusValidation === 'true' ? true : false;
  const requestorId = getRequestorId(req.cookies.token);

  validateUpdateUserCursusForm(userCursusId, requestorId);

  if (isValidated) {
    // Check that user has access to all lessons in this cursus otherwise, validate this cursus is not allowed
    const hasAccessToAllLessons = await checkUserAccessAllLessonsInCursus(userCursusId);
    if(!hasAccessToAllLessons) {
      return res.status(200).json({
        success: false,
        message: "Cet utilisateur n'a pas accès à toutes les leçons de ce cursus, il n'est donc pas possible de lui valider le cursus.",
      });
    }
  }

  const hasUserCursusValidationChanged = await updateUserCursus(userCursusId, isValidated, requestorId);

  if (hasUserCursusValidationChanged) {
    return res.status(200).json({
      success: true,
      message: `L'association utilisateur / cursus a bien été ${isValidated ? 'validée' : 'invalidée'}.`,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: `L'association utilisateur / cursus est déjà ${isValidated ? 'validée' : 'invalidée'}.`,
    });
  }
}

export async function deleteUserCursusController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const userCursusId = Number(req.params.userCursusId);
  const requestorId = getRequestorId(req.cookies.token);
  if (!userCursusId || Number.isNaN(userCursusId)) throw new AppError(
    422,
    "deleteUserCursusController function in user-cursus controller failed : userCursusId has to be a number in url parameter",
    "L'identifiant de l'association utilisateur / cursus n'est pas fourni ou n'est pas un nombre. Impossible de supprimer cette association."
  );

  await deleteUserCursus(userCursusId, requestorId);

  return res.status(200).json({
    success: true,
    message: "L'association utilisateur / cursus a bien été supprimée.",
  });
}