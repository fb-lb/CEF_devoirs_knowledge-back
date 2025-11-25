import { Request, Response } from 'express';
import { ApiResponse, ThemeData } from "../types/Interfaces.js";
import { addTheme, changeOrderThemes, deleteTheme, getAllThemes, updateTheme } from '../services/theme.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { getRequestorId } from '../services/token.service.js';
import { validateAddThemeForm, validateUpdateThemeForm } from '../services/form.service.js';
import { deleteUserThemeForThisTheme } from '../services/user-theme.service.js';

/**
 * Handle all themes retrieval.
 *
 * @route GET /api/content/theme/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all theme informations.
 * 
 * @returns {Promise<Response<ApiResponse<ThemeData[]>>>} Returns:
 * - 200 with a list of objects containing theme informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all theme informations.
 */
export async function getAllThemesController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  const allThemes: ThemeData[] = await getAllThemes();
  return res.status(200).json({
    success: true,
    message: '',
    data: allThemes,
  });
}

/**
 * Handle theme order update.
 *
 * @route GET /api/content/theme/:id/:move
 * @param {Request} req - Express request containing the ID of the theme to move and the movement ('up' | 'down') in URL parameters.
 * @param {Response} res - Express response containing the informations of all the themes.
 * 
 * @returns {Promise<Response<ApiResponse<ThemeData[] | any>>>} Returns:
 * - 200 with an object containing all the theme informations in data property.
 * - 400 if movement is 'up' and theme is at first position or if movement is 'down' with theme at the last position.
 *
 * @description
 * Steps:
 * - Checks that theme ID is provided in URL params,
 * - Checks that move is provided in URL params and equals to 'up' | 'down',
 * - Change the order of the target theme,
 * - Get all theme informations.
 * 
 * @throws {AppError} If no id provided in URL params.
 * @throws {AppError} If move in URL param is not provided or different from 'up' | 'down'.
 */
export async function changeOrderThemesController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[] | any>>> {
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

/**
 * Handle theme creation.
 *
 * @route POST /api/content/theme/add
 * @param {Request} req - Express request containing the theme informations in the body.
 * @param {Response} res - Express response containing the informations of all the themes.
 * 
 * @returns {Promise<Response<ApiResponse<ThemeData[]>>>} Returns:
 * - 200 with an object containing all the theme informations in data property.
 *
 * @description
 * Steps:
 * - Validates the theme informations,
 * - Gets the requestor ID,
 * - Creates the new theme,
 * - Get all theme informations,
 */
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

/**
 * Handle theme deletion.
 *
 * @route DELETE /api/content/theme/:id
 * @param {Request} req - Express request containing the ID of the theme to delete in URL parameter.
 * @param {Response} res - Express response containing the informations of all the themes.
 * 
 * @returns {Promise<Response<ApiResponse<ThemeData[]>>>} Returns:
 * - 200 with an object containing all the theme informations in data property.
 *
 * @description
 * Steps:
 * - Deletes all the user-themes related to the theme to delete,
 * - Deletes the target theme,
 * - Get all theme informations.
 * 
 * @throws {AppError} If theme ID URL parameter is not provided.
 */
export async function deleteThemeController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  if(!req.params.id) throw new AppError(
    422,
    'deleteThemeController function in theme controller failed : no id provided in url parameter',
    "Le thème n'a pas pu être retrouvé car son identifiant n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );

  const themeId = parseInt(req.params.id);

  await deleteUserThemeForThisTheme(themeId);
  
  await deleteTheme(themeId);

  const allThemes = await getAllThemes();
  return res.status(200).json({
    success: true,
    message: 'Le thème a bien été supprimé.',
    data: allThemes,
  });
}

/**
 * Handle theme update.
 *
 * @route PATCH /api/content/theme/:id
 * @param {Request} req - Express request containing the ID of the theme to update in URL parameter.
 * @param {Response} res - Express response containing the informations of all the themes.
 * 
 * @returns {Promise<Response<ApiResponse<ThemeData[]>>>} Returns:
 * - 200 with an object containing all the theme informations in data property.
 *
 * @description
 * Steps:
 * - Validates the theme informations,
 * - Updates the target theme,
 * - Get all theme informations.
 * 
 * @throws {AppError} If theme ID URL parameter is not provided.
 */
export async function updateThemeController(req: Request, res: Response): Promise<Response<ApiResponse<ThemeData[]>>> {
  if(!req.params.id) throw new AppError(
    422,
    'updateThemeController function in theme controller failed : no theme id provided in url paramater',
    "L'identifiant du thème n'a pas été fourni avec le formulaire, veuillez contacter le support pour solutionner le problème au plus vite.",
  );

  const themeId = parseInt(req.params.id);

  const newThemeName: string = req.body.name;
  validateUpdateThemeForm(newThemeName);

  const requestorId = getRequestorId(req.cookies.token);

  await updateTheme(themeId, newThemeName, requestorId);

  const allThemes = await getAllThemes();

  return res.status(200).json({
    success: true,
    message: 'Le thème a bien été mis à jour.',
    data: allThemes,
  });
}