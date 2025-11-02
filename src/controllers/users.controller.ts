import { NextFunction, Request, Response } from 'express';
import { ApiResponse, MyCheckingPayload } from "../types/Interfaces.js";
import { deleteUser, getAllUsers, updateUser } from '../services/user.service.js';
import { validateUpdateUserForm } from '../services/form.service.js';
import { getRequestorId } from '../services/token.service.js';
import { AppError } from '../utils/AppError.js';
import { privateUser } from '../middlewares/private.middleware.js';

export async function allUsers(req: Request, res: Response): Promise<Response<ApiResponse<MyCheckingPayload['user'][]>>> {
  const allUsers = await getAllUsers();
  return res.status(200).json({
    success: true,
    message:'',
    data: allUsers,
  })
}

export function updateUserController(req: Request, res: Response): Response<ApiResponse> {
  const body = req.body;
  validateUpdateUserForm(body);
  const requestorId = getRequestorId(req.cookies.token);
  updateUser(requestorId, body);
  return res.status(200).json({
    success: true,
    message: "L'utilisateur a bien été mis à jour.",
  });
}

export function deleteUserController(req: Request, res: Response): Response<ApiResponse> {
  if (!req.params.id) throw new AppError(422, 'Request param id was not provided in delete user request', "Nous ne parvenons pas à accéder à l'idnetifiant de l'utilisateur, veuillez nous excuser pour la gêne occasionnée. Nous mettons tout en oeuvre pour solutionner ce problème.");
  const userId = parseInt(req.params.id, 10);
  deleteUser(userId);
  return res.status(200).json({
    success: true,
    message: "L'utilisateur a bien été supprimé.",
  })
}

export async function isAuthenticatedController(req: Request, res: Response, next: NextFunction): Promise<Response<ApiResponse>>{
  try {
    await privateUser(req, res, next);
    return res.status(200).json({
      success: true,
      message: '',
    });
  } catch (error: any) {
    if (error instanceof AppError && (error.cause as any).message === "jwt must be provided") return res.status(200).json({ success: false, message: '' });
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "isAuthenticatedController function in user controller failed",
      "La vérification l'authentification de l'utilisateur a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}