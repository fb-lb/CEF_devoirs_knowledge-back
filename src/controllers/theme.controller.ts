import { Request, Response } from 'express';
import { ApiResponse, ThemeData } from "../types/Interfaces.js";
import { changeOrderThemes, getAllThemes } from '../services/theme.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';

export async function getAllThemesController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  const allThemes: ThemeData[] = await getAllThemes();
  return res.status(200).json({
    success: true,
    message: '',
    data: allThemes,
  });
}

export async function changeOrderThemesController(req: Request, res: Response) {
  if (!req.params.id) throw new AppError(
    400,
    'changeOrderThemesController function in theme controller failed : no id provided in url params',
    "Nous ne pouvons changer l'ordre des thèmes, car l'identifiant du thème n'est pas fourni."
  )
  if (!req.params.move || (req.params.move !== 'up' && req.params.move !== 'down')) throw new AppError(
    400,
    'changeOrderThemesController function in theme controller failed : no move provided in url params',
    "Nous ne pouvons changer l'ordre des thèmes, car le changement d'ordre (up ou down) du thème n'est pas fourni ou est mal défini."
  )
  
  const userId = getUserIdInRequest(req);
  const themeId = parseInt(req.params.id);
  const response = await changeOrderThemes(themeId, req.params.move, userId);
  if (!response.success) return res.status(400).json({ success: false, message: response.message });

  const allThemes: ThemeData[] = await getAllThemes();
  return res.status(200).json({
    success: true,
    message: '',
    data: allThemes,
  });
}