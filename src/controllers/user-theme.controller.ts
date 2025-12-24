import { Request, Response } from "express";
import { ApiResponse, ThemeData, UserThemeData } from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import {
  checkUserAccessAllLessonsInTheme,
  deleteUserTheme,
  getAllThemesAvailable,
  getAllUserThemeData,
  getUsersThemesForThisUser,
  updateUserTheme,
} from "../services/user-theme.service.js";
import { AppError } from "../utils/AppError.js";
import { validateUpdateUserThemeForm } from "../services/form.service.js";

/**
 * Handle all user-themes retrieval.
 *
 * @route GET /api/user-theme/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all user-theme informations.
 *
 * @returns {Promise<Response<ApiResponse<UserThemeData[]>>>} Returns:
 * - 200 with a list of objects containing user-theme informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all user-theme informations.
 */
export async function getAllUserThemeController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<UserThemeData[]>>> {
  const allUserThemeData = await getAllUserThemeData();

  return res.status(200).json({
    success: true,
    message: "",
    data: allUserThemeData,
  });
}

/**
 * Handle retrieval of all available themes for a specific user.
 *
 * @route GET /api/user-theme/theme/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all available themes for a specific user.
 *
 * @returns {Promise<Response<ApiResponse<ThemeData[]>>>} Returns:
 * - 200 with a list of objects containing informations on available themes for a specific user in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the requestor who is the user related to the themes to retrieve,
 * - Retrieves informations on all available themes for a specific user.
 */
export async function getAllThemesAvailableController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ThemeData[]>>> {
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);

  const allThemesAvailable = await getAllThemesAvailable(requestorId);

  return res.status(200).json({
    success: true,
    message: "",
    data: allThemesAvailable,
  });
}

/**
 * Handle all user-themes retrieval for a specific user.
 *
 * @route GET /api/user-theme/some
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all user-theme informations for a specific user.
 *
 * @returns {Promise<Response<ApiResponse<UserThemeData[]>>>} Returns:
 * - 200 with a list of objects containing user-theme informations for a specific user in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the requestor who is the user related to user-themes to retrieve,
 * - Retrieves all user-theme informations for a specific user.
 */
export async function getSomeUserThemeController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<UserThemeData[]>>> {
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);
  const userThemesForThisUser = await getUsersThemesForThisUser(requestorId);

  return res.status(200).json({
    success: true,
    message: "",
    data: userThemesForThisUser,
  });
}

/**
 * Handle user-theme update.
 *
 * @route PATCH /api/user-theme/:userThemeId
 * @param {Request} req - Express request containing the user-theme informations in the body.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Validates update user-theme informations,
 * - Checks that the user has access to all lessons in the theme, otherwise he can't certify his theme,
 * - Updates the user-theme isCertified property.
 */
export async function updateUserThemeController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse>> {
  const userThemeId = Number(req.params.userThemeId);
  const isCertified =
    req.body.updateUserThemeCertification === true ||
    req.body.updateUserThemeCertification === "true"
      ? true
      : false;
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);

  validateUpdateUserThemeForm(userThemeId, requestorId);

  if (isCertified) {
    // Check that user has access to all lessons in this theme otherwise, give a certification to this theme is not allowed
    const hasAccessToAllLessons = await checkUserAccessAllLessonsInTheme(
      userThemeId
    );
    if (!hasAccessToAllLessons) {
      return res.status(200).json({
        success: false,
        message:
          "Cet utilisateur n'a pas accès à toutes les leçons de ce thème, il n'est donc pas possible de lui délivrer une certification.",
      });
    }
  }

  const hasUserThemeCertificationChanged = await updateUserTheme(
    userThemeId,
    isCertified,
    requestorId
  );

  if (hasUserThemeCertificationChanged) {
    return res.status(200).json({
      success: true,
      message: `L'association utilisateur / thème a bien été ${
        isCertified ? "validée" : "invalidée"
      }.`,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: `L'association utilisateur / thème est déjà ${
        isCertified ? "validée" : "invalidée"
      }.`,
    });
  }
}

/**
 * Handle user-theme deletion.
 *
 * @route DELETE /api/user-theme/:userThemeId
 * @param {Request} req - Express request containing the ID of the user-theme to delete in URL parameter.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Deletes the targeted user-theme.
 *
 * @throws {AppError} If user-theme relation is not found with the provided ID.
 */
export async function deleteUserThemeController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse>> {
  const userThemeId = Number(req.params.userThemeId);
  if (!userThemeId || Number.isNaN(userThemeId))
    throw new AppError(
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
