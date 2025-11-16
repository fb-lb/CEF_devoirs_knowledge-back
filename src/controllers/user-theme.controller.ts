import { Request, Response } from "express"
import { ApiResponse, ThemeData, UserThemeData } from "../types/Interfaces.js"
import { getRequestorId } from "../services/token.service.js"
import { checkUserAccessAllLessonsInTheme, deleteUserTheme, getAllThemesAvailable, getAllUserThemeData, getUsersThemesForThisUser, updateUserTheme } from "../services/user-theme.service.js";
import { AppError } from "../utils/AppError.js";
import { validateUpdateUserThemeForm } from "../services/form.service.js";

export async function getAllUserThemeController(req: Request, res: Response): Promise<Response<ApiResponse<UserThemeData>>> {
  const allUserThemeData = await getAllUserThemeData(); 
  
  return res.status(200).json({
    success: true,
    message: '',
    data: allUserThemeData,
  });
}

export async function getAllThemesAvailableController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  
  const allThemesAvailable = await getAllThemesAvailable(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: allThemesAvailable,
  });
}

export async function getSomeUserThemeController(req: Request, res: Response): Promise<Response<ApiResponse<UserThemeData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  const userThemesForThisUser = await getUsersThemesForThisUser(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: userThemesForThisUser,
  });
}

export async function updateUserThemeController(req: Request, res: Response): Promise<Response<ApiResponse>> {  
  const userThemeId = Number(req.params.userThemeId);
  const isCertified = req.body.updateUserThemeCertification === true || req.body.updateUserThemeCertification === 'true' ? true : false;
  const requestorId = getRequestorId(req.cookies.token);

  validateUpdateUserThemeForm(userThemeId, requestorId);

  if (isCertified) {
    // Check that user has access to all lessons in this theme otherwise, give a certification to this theme is not allowed
    const hasAccessToAllLessons = await checkUserAccessAllLessonsInTheme(userThemeId);
    if(!hasAccessToAllLessons) {
      return res.status(200).json({
        success: false,
        message: "Cet utilisateur n'a pas accès à toutes les leçons de ce thème, il n'est donc pas possible de lui délivrer une certification.",
      });
    }
  }

  const hasUserThemeCertificationChanged = await updateUserTheme(userThemeId, isCertified, requestorId);

  if (hasUserThemeCertificationChanged) {
    return res.status(200).json({
      success: true,
      message: `L'association utilisateur / thème a bien été ${isCertified ? 'validée' : 'invalidée'}.`,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: `L'association utilisateur / thème est déjà ${isCertified ? 'validée' : 'invalidée'}.`,
    });
  }
}

export async function deleteUserThemeController(req: Request, res: Response): Promise<Response<ApiResponse>> {
  const userThemeId = Number(req.params.userThemeId);
  if (!userThemeId || Number.isNaN(userThemeId)) throw new AppError(
    422,
    "deleteUserThemeController function in user-theme controller failed : userThemeId has to be a number in url parameter",
    "L'identifiant de l'association utilisateur / thème n'est pas fourni ou n'est pas un nombre. Impossible de supprimer cette association."
  );

  await deleteUserTheme(userThemeId);
  
  return res.status(200).json({
    success: true,
    message: "L'association utilisateur/thème a bien été supprimée.",
  });
}