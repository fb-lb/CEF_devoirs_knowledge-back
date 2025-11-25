import { Request, Response  } from "express";
import { ApiResponse, CursusData, UserCursusData } from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import { addUserCursus, checkUserAccessAllLessonsInCursus, deleteUserCursus, getAllCursusAvailable, getAllUserCursusData, getUsersCursusForThisUser, updateUserCursus } from "../services/user-cursus.service.js";
import { getLessonsInCursus } from "../services/lesson.service.js";
import { addUserLesson } from "../services/user-lesson.service.js";
import { addUserTheme } from "../services/user-theme.service.js";
import { validateUpdateUserCursusForm } from "../services/form.service.js";
import { AppError } from "../utils/AppError.js";

/**
 * Handle user-cursus creation.
 *
 * @route POST /api/user-cursus/add
 * @param {Request} req - Express request containing the user-cursus informations in the body.
 * @param {Response} res - Express response.
 * 
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Create the user-cursus if not already created,
 * - Create a user-lesson for each lesson in this cursus if not already created,
 * - Create a user-theme for the them containing the cursus if not already created.
 */
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

/**
 * Handle all user-cursus retrieval.
 *
 * @route GET /api/user-cursus/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all user-cursus informations.
 * 
 * @returns {Promise<Response<ApiResponse<UserCursusData[]>>>} Returns:
 * - 200 with a list of objects containing user-cursus informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all user-cursus informations.
 */
export async function getAllUserCursusController(req: Request, res: Response): Promise<Response<ApiResponse<UserCursusData[]>>> {
  const allUserCursusData = await getAllUserCursusData(); 
  
  return res.status(200).json({
    success: true,
    message: '',
    data: allUserCursusData,
  });
}

/**
 * Handle all user-cursus retrieval for a specific user.
 *
 * @route GET /api/user-cursus/some
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all user-cursus informations for a specific user.
 * 
 * @returns {Promise<Response<ApiResponse<UserCursusData[]>>>} Returns:
 * - 200 with a list of objects containing user-cursus informations for a specific user in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the requestor who is the user related to user-cursus to retrieve,
 * - Retrieves all user-cursus informations for a specific user.
 */
export async function getSomeUserCursusController(req: Request, res: Response): Promise<Response<ApiResponse<UserCursusData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  const userCursusForThisUser = await getUsersCursusForThisUser(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: userCursusForThisUser,
  });
}

/**
 * Handle retrieval of all available cursus for a specific user.
 *
 * @route GET /api/user-cursus/cursus/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all cursus available for a specific user.
 * 
 * @returns {Promise<Response<ApiResponse<CursusData[]>>>} Returns:
 * - 200 with a list of objects containing informations on available cursus for a specific user in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the requestor who is the user related to the cursus to retrieve,
 * - Retrieves informations on all available cursus for a specific user.
 */
export async function getAllCursusAvailableController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  const requestorId = getRequestorId(req.cookies.token);
  
  const allCursusAvailable = await getAllCursusAvailable(requestorId);

  return res.status(200).json({
    success: true,
    message: '',
    data: allCursusAvailable,
  })
}

/**
 * Handle user-cursus update.
 *
 * @route PATCH /api/user-cursus/:userCursusId
 * @param {Request} req - Express request containing the user-cursus informations in the body.
 * @param {Response} res - Express response.
 * 
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Validate update user-cursus informations,
 * - Checks that the user has access to all lessons in the cursus, otherwise he can't validate his cursus,
 * - Updates the user-cursus isVerified property.
 */
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

/**
 * Handle user-cursus deletion.
 *
 * @route DELETE /api/user-cursus/:userCursusId
 * @param {Request} req - Express request containing the ID of the user-cursus to delete in URL parameter.
 * @param {Response} res - Express response.
 * 
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Deletes the targeted user-cursus.
 * 
 * @throws {AppError} If user-cursus relation is not found with the provided ID.
 */
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