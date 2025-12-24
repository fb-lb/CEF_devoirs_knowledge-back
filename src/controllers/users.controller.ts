import { Request, Response } from "express";
import { ApiResponse, UserData } from "../types/Interfaces.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../services/user.service.js";
import { validateUpdateUserForm } from "../services/form.service.js";
import { getRequestorId } from "../services/token.service.js";
import { AppError } from "../utils/AppError.js";

/**
 * Handle all users retrieval.
 *
 * @route GET /api/utilisateurs/tous
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all user informations.
 *
 * @returns {Promise<Response<ApiResponse<UserData[]>>>} Returns:
 * - 200 with a list of objects containing user informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all user informations.
 */
export async function allUsers(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<UserData[]>>> {
  const allUsers = await getAllUsers();
  return res.status(200).json({
    success: true,
    message: "",
    data: allUsers,
  });
}

/**
 * Handle user update.
 *
 * @route PATCH /api/utilisateurs/:id
 * @param {Request} req - Express request containing the ID of the user to update in URL parameter.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Validates the user informations,
 * - Updates the target user.
 *
 * @throws {AppError} If cursus ID URL parameter is not provided.
 */
export function updateUserController(
  req: Request,
  res: Response
): Response<ApiResponse> {
  const body = req.body;
  validateUpdateUserForm(body);
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);
  updateUser(requestorId, body);
  return res.status(200).json({
    success: true,
    message: "L'utilisateur a bien été mis à jour.",
  });
}

/**
 * Handle user deletion.
 *
 * @route DELETE /api/utilisateurs/:id
 * @param {Request} req - Express request containing the ID of the user to delete in URL parameter.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code.
 *
 * @description
 * Steps:
 * - Deletes the targeted user.
 *
 * @throws {AppError} If user ID URL parameter is not provided.
 */
export function deleteUserController(
  req: Request,
  res: Response
): Response<ApiResponse> {
  if (!req.params.id)
    throw new AppError(
      422,
      "Request param id was not provided in delete user request",
      "Nous ne parvenons pas à accéder à l'idnetifiant de l'utilisateur, veuillez nous excuser pour la gêne occasionnée. Nous mettons tout en oeuvre pour solutionner ce problème."
    );
  const userId = parseInt(req.params.id, 10);
  deleteUser(userId);
  return res.status(200).json({
    success: true,
    message: "L'utilisateur a bien été supprimé.",
  });
}

/**
 * Check that has verified or not his email address.
 *
 * @route GET /api/utilisateurs/isVerified
 * @param {Request} req - Express request.
 * @param {Response} res - Express response.
 *
 * @returns {Promise<Response<ApiResponse>>} Returns express response with 200 status code. For data :
 * - returns true if user is verified
 * - returns false if user is not verified
 *
 * @description
 * Steps:
 * - Verifies that the requestor has verified his email address.
 *
 * @throws {AppError} If an unexpected error occurs.
 */
export async function isVerifiedController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<boolean>>> {
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);
  const user = await getUser(requestorId);
  const isVerified = user.isVerified;

  return res.status(200).json({
    success: true,
    message: "",
    data: isVerified,
  });
}
