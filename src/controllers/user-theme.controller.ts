import { Request, Response } from "express"
import { ApiResponse, ThemeData, UserThemeData } from "../types/Interfaces.js"
import { getRequestorId } from "../services/token.service.js"
import { getAllThemesAvailable, getUsersThemesForThisUser } from "../services/user-theme.service.js";

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