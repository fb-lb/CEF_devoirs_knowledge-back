import { Request, Response } from 'express';
import { ApiResponse, CursusData } from "../types/Interfaces.js";
import { addCursus, changeOrderCursus, deleteCursus, getAllCursus, getCursus, getThemeIdForThisCursus, updateCursus } from '../services/cursus.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { getRequestorId } from '../services/token.service.js';
import { validateAddCursusForm, validateUpdateCursusForm } from '../services/form.service.js';
import { deleteUserCursusForThisCursus, getUsersWhoHaveUserCursusForThisTheme } from '../services/user-cursus.service.js';
import { checkUserThemeCertification } from '../services/user-theme.service.js';

/**
 * Handle all cursus retrieval.
 *
 * @route GET /api/content/cursus/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all cursus informations.
 * 
 * @returns {Promise<Response<ApiResponse<CursusData[]>>>} Returns:
 * - 200 with a list of objects containing cursus informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all cursus informations.
 */
export async function getAllCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  const allCursus: CursusData[] = await getAllCursus();
  return res.status(200).json({
    success: true,
    message: '',
    data: allCursus,
  });
}

/**
 * Handle one cursus retrieval.
 *
 * @route GET /api/content/cursus/:id
 * @param {Request} req - Express request containing the ID of the cursus to retrieve in URL parameter.
 * @param {Response} res - Express response containing the informations of the cursus.
 * 
 * @returns {Promise<Response<ApiResponse<CursusData>>>} Returns:
 * - 200 with an object containing the cursus informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves the cursus informations with the provided ID.
 */
export async function getCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData>>> {
  const cursusId = Number(req.params.id);
  const cursus: CursusData = await getCursus(cursusId);
  return res.status(200).json({
    success: true,
    message: '',
    data: cursus,
  });
}

/**
 * Handle cursus order update.
 *
 * @route GET /api/content/cursus/:id/:move
 * @param {Request} req - Express request containing the ID of the cursus to move and the movement ('up' | 'down') in URL parameters.
 * @param {Response} res - Express response containing the informations of all the cursus.
 * 
 * @returns {Promise<Response<ApiResponse<CursusData[] | any>>>} Returns:
 * - 200 with an object containing all the cursus informations in data property.
 * - 400 if movement is 'up' and cursus is at first position or if movement is 'down' with cursus at the last position.
 *
 * @description
 * Steps:
 * - Checks that cursus ID is provided in URL params,
 * - Checks that move is provided in URL params and equals to 'up' | 'down',
 * - Change the order of the target cursus,
 * - Get all cursus informations.
 * 
 * @throws {AppError} If no id provided in URL params.
 * @throws {AppError} If move in URL param is not provided or different from 'up' | 'down'.
 */
export async function changeOrderCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[] | any>>> {
  if (!req.params.id) throw new AppError(
    400,
    'changeOrderCrususController function in cursus controller failed : no id provided in url params',
    "Nous ne pouvons changer l'ordre des cursus, car l'identifiant du cursus n'est pas fourni."
  )
  if (!req.params.move || (req.params.move !== 'up' && req.params.move !== 'down')) throw new AppError(
    400,
    'changeOrderCursusController function in cursus controller failed : no move provided in url params',
    "Nous ne pouvons changer l'ordre des cursus, car le changement d'ordre (up ou down) du cursus n'est pas fourni ou est mal défini."
  )
  
  const userId = getUserIdInRequest(req);
  const cursusId = parseInt(req.params.id);
  const response = await changeOrderCursus(cursusId, req.params.move, userId);
  if (!response.success) return res.status(400).json({ success: false, message: response.message });

  const allCursus: CursusData[] = await getAllCursus();
  return res.status(200).json({
    success: true,
    message: '',
    data: allCursus,
  });
}

/**
 * Handle cursus creation.
 *
 * @route POST /api/content/cursus/add
 * @param {Request} req - Express request containing the cursus informations in the body.
 * @param {Response} res - Express response containing the informations of all the cursus.
 * 
 * @returns {Promise<Response<ApiResponse<CursusData[]>>>} Returns:
 * - 200 with an object containing all the cursus informations in data property.
 *
 * @description
 * Steps:
 * - Validates the cursus informations,
 * - Gets the requestor ID,
 * - Creates the new cursus,
 * - Get all cursus informations,
 * - Updates users' certification for the theme containing this new cursus.
 */
export async function addCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  const cursusName: string = req.body.name;
  const themeId: number = req.body.themeId;
  const price: number = req.body.price;
  validateAddCursusForm(cursusName, themeId, price);

  const requestorId = getRequestorId(req.cookies.token);

  let allCursus = await getAllCursus();
  let selectedCursus: CursusData[] = [];
  for (const cursus of allCursus) {
    if (cursus.themeId === themeId) selectedCursus.push(cursus);
  }
  
  await addCursus(cursusName, price, selectedCursus, requestorId, themeId);

  allCursus = await getAllCursus();

  // Check theme certification for each user who have access to the theme of this cursus
  const users = await getUsersWhoHaveUserCursusForThisTheme(themeId);
  for(const user of users) {
    await checkUserThemeCertification(themeId, user.id, requestorId);
  }

  return res.status(200).json({
    success: true,
    message: `Le cursus ${cursusName} a bien été ajouté`,
    data: allCursus,
  });
}

/**
 * Handle cursus deletion.
 *
 * @route DELETE /api/content/cursus/:id
 * @param {Request} req - Express request containing the ID of the cursus to delete in URL parameter.
 * @param {Response} res - Express response containing the informations of all the cursus.
 * 
 * @returns {Promise<Response<ApiResponse<CursusData[]>>>} Returns:
 * - 200 with an object containing all the cursus informations in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the theme containing the cursus,
 * - Gets a list of users who have user-cursus associations related to this theme,
 * - Deletes the user-cursus related to the cursus to delete,
 * - Deletes the targeted cursus,
 * - Updates users' certification for the theme containing this cursus,
 * - Get all cursus informations.
 * 
 * @throws {AppError} If cursus ID URL parameter is not provided.
 */
export async function deleteCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  if(!req.params.id) throw new AppError(
    422,
    'deleteCursusController function in cursus controller failed : no id provided in url parameter',
    "Le cursus n'a pas pu être retrouvé car son identifiant n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );

  const requestorId = getRequestorId(req.cookies.token);
  const cursusId = parseInt(req.params.id);

  const themeId = await getThemeIdForThisCursus(cursusId);
  const usersWhoHaveUserCursusForThisTheme = await getUsersWhoHaveUserCursusForThisTheme(themeId);

  await deleteUserCursusForThisCursus(cursusId, requestorId);

  await deleteCursus(cursusId);

  for(const user of usersWhoHaveUserCursusForThisTheme) {
    await checkUserThemeCertification(themeId, user.id, requestorId);
  }

  const allCursus = await getAllCursus();
  return res.status(200).json({
    success: true,
    message: 'Le cursus a bien été supprimé.',
    data: allCursus,
  });
}

/**
 * Handle cursus update.
 *
 * @route PATCH /api/content/cursus/:id
 * @param {Request} req - Express request containing the ID of the cursus to update in URL parameter.
 * @param {Response} res - Express response containing the informations of all the cursus.
 * 
 * @returns {Promise<Response<ApiResponse<CursusData[]>>>} Returns:
 * - 200 with an object containing all the cursus informations in data property.
 *
 * @description
 * Steps:
 * - Validates the cursus informations,
 * - Updates the target cursus,
 * - Get all cursus informations.
 * 
 * @throws {AppError} If cursus ID URL parameter is not provided.
 */
export async function updateCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  if(!req.params.id) throw new AppError(
    422,
    'updateCursusController function in cursus controller failed : no cursus id provided in url paramater',
    "L'identifiant du cursus n'a pas été fourni avec le formulaire, veuillez contacter le support pour solutionner le problème au plus vite.",
  );

  const cursusId = parseInt(req.params.id);

  const newCursusName: string = req.body.name;
  const newCursusPrice: number = Number(req.body.price);
  validateUpdateCursusForm(newCursusName, newCursusPrice);

  const requestorId = getRequestorId(req.cookies.token);

  await updateCursus(cursusId, newCursusName, newCursusPrice, requestorId);

  const allCursus = await getAllCursus();

  return res.status(200).json({
    success: true,
    message: 'Le cursus a bien été mis à jour.',
    data: allCursus,
  });
}