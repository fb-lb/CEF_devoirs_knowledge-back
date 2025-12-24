import { Request, Response } from "express";
import {
  ApiResponse,
  LessonData,
  UserLessonData,
} from "../types/Interfaces.js";
import { getRequestorId } from "../services/token.service.js";
import { addUserCursus } from "../services/user-cursus.service.js";
import { addUserTheme } from "../services/user-theme.service.js";
import {
  addUserLesson,
  deleteUserLesson,
  getAllLessonsAvailable,
  getAllUserLessonData,
  getUsersLessonsForThisUser,
  updateUserLesson,
} from "../services/user-lesson.service.js";
import { AppError } from "../utils/AppError.js";
import { validateUpdateUserLessonForm } from "../services/form.service.js";

/**
 * Handle user-lesson creation.
 *
 * @route POST /api/user-lesson/add
 * @param {Request} req - Express request containing the user-lesson informations in the body.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Create the user-lesson if not already created,
 * - Create a user-cursus for the cursus containing the lesson if not already created,
 * - Create a user-theme for the theme containing the cursus if not already created.
 */
export async function addUserLessonController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse>> {
  const lessonId: number = Number(req.body.courseId);
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);
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

/**
 * Handle all user-lesson retrieval.
 *
 * @route GET /api/user-lesson/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all user-lesson informations.
 *
 * @returns {Promise<Response<ApiResponse<UserLessonData[]>>>} Returns:
 * - 200 with a list of objects containing user-lesson informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all user-lesson informations.
 */
export async function getAllUserLessonController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<UserLessonData[]>>> {
  const allUserLessonData = await getAllUserLessonData();

  return res.status(200).json({
    success: true,
    message: "",
    data: allUserLessonData,
  });
}

/**
 * Handle all user-lessons retrieval for a specific user.
 *
 * @route GET /api/user-lesson/some
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all user-lesson informations for a specific user.
 *
 * @returns {Promise<Response<ApiResponse<UserLessonData[]>>>} Returns:
 * - 200 with a list of objects containing user-lesson informations for a specific user in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the requestor who is the user related to user-lesson to retrieve,
 * - Retrieves all user-lesson informations for a specific user.
 */
export async function getSomeUserLessonController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<UserLessonData[]>>> {
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);
  const userLessonsForThisUser = await getUsersLessonsForThisUser(requestorId);

  return res.status(200).json({
    success: true,
    message: "",
    data: userLessonsForThisUser,
  });
}

/**
 * Handle retrieval of all available lesson for a specific user.
 *
 * @route GET /api/user-lesson/lesson/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all lessons available for a specific user.
 *
 * @returns {Promise<Response<ApiResponse<LessonData[]>>>} Returns:
 * - 200 with a list of objects containing informations on available lessons for a specific user in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the requestor who is the user related to the lessons to retrieve,
 * - Retrieves informations on all available lessons for a specific user.
 */
export async function getAllLessonsAvailableController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<LessonData[]>>> {
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);

  const allLessonsAvailable = await getAllLessonsAvailable(requestorId);

  return res.status(200).json({
    success: true,
    message: "",
    data: allLessonsAvailable,
  });
}

/**
 * Handle user-lesson update.
 *
 * @route PATCH /api/user-lesson/:userLessonId
 * @param {Request} req - Express request containing the user-lesson informations in the body.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Validate update user-lesson informations,
 * - Updates the user-lesson isVerified property.
 */
export async function updateUserLessonController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse>> {
  const userLessonId = Number(req.params.userLessonId);
  const isValidated =
    req.body.updateUserLessonValidation === true ||
    req.body.updateUserLessonValidation === "true"
      ? true
      : false;
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);

  validateUpdateUserLessonForm(userLessonId, requestorId);

  const hasUserLessonValidationChanged = await updateUserLesson(
    userLessonId,
    requestorId,
    isValidated
  );

  if (hasUserLessonValidationChanged) {
    return res.status(200).json({
      success: true,
      message: `L'association utilisateur / leçon a bien été ${
        isValidated ? "validée" : "invalidée"
      }.`,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: `L'association utilisateur / leçon est déjà ${
        isValidated ? "validée" : "invalidée"
      }.`,
    });
  }
}

/**
 * Handle user-lesson deletion.
 *
 * @route DELETE /api/user-lesson/:userLessonId
 * @param {Request} req - Express request containing the ID of the user-lesson to delete in URL parameter.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Deletes the targeted user-lesson.
 *
 * @throws {AppError} If user-lesson relation is not found with the provided ID.
 */
export async function deleteUserLessonController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse>> {
  const userLessonId = Number(req.params.userLessonId);
  if (!userLessonId || Number.isNaN(userLessonId))
    throw new AppError(
      422,
      "deleteUserLessonController function in user-lesson controller failed : userLessonId has to be a number in url parameter",
      "L'identifiant de l'association utilisateur / leçon n'est pas fourni ou n'est pas un nombre. Impossible de supprimer cette association."
    );

  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);

  await deleteUserLesson(userLessonId, requestorId);

  return res.status(200).json({
    success: true,
    message: "L'association utilisateur / leçon a bien été supprimée.",
  });
}
