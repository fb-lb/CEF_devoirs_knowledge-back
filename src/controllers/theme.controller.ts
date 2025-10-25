import { Request, Response } from 'express';
import { ApiResponse, ThemeData } from "../types/Interfaces.js";
import { addTheme, changeOrderThemes, deleteTheme, getAllThemes } from '../services/theme.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { getRequestorId } from '../services/token.service.js';
import { validateAddThemeForm } from '../services/form.service.js';

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

export async function addThemeController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  const themeName: string = req.body.name;
  validateAddThemeForm(themeName);

  const requestorId = getRequestorId(req.cookies.token);

  let allThemes = await getAllThemes();
  
  await addTheme(themeName, allThemes, requestorId);

  allThemes = await getAllThemes();

  return res.status(200).json({
    success: true,
    message: `Le thème ${themeName} a bien été ajouté`,
    data: allThemes,
  });
}

export async function deleteThemeController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  if(!req.params.id) throw new AppError(
    422,
    'deleteThemeController function in theme controller failed : no id provided in url parameter',
    "Le thème n'a pas pu être retrouvé car son identifiant n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );

  const themeId = parseInt(req.params.id);
  await deleteTheme(themeId);

  const allThemes = await getAllThemes();
  return res.status(200).json({
    success: true,
    message: 'Le thème a bien été supprimé.',
    data: allThemes,
  });
}