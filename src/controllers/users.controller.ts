import { Request, Response } from 'express';
import { ApiResponse, MyCheckingPayload } from "../types/Interfaces.js";
import { deleteUser, getAllUsers, updateUser } from '../services/user.service.js';
import { validateUpdateUserForm } from '../services/form.service.js';
import { getRequestorId } from '../services/token.service.js';
import { AppError } from '../utils/AppError.js';

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