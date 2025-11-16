import { Request, Response } from 'express';
import { ApiResponse, CursusData } from "../types/Interfaces.js";
import { addCursus, changeOrderCursus, deleteCursus, getAllCursus, getCursus, getThemeIdForThisCursus, updateCursus } from '../services/cursus.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { getRequestorId } from '../services/token.service.js';
import { validateAddCursusForm, validateUpdateCursusForm } from '../services/form.service.js';
import { deleteUserCursus, deleteUserCursusForThisCursus, getUsersWhoHaveUserCursusForThisTheme } from '../services/user-cursus.service.js';
import { checkUserThemeCertification } from '../services/user-theme.service.js';

export async function getAllCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  const allCursus: CursusData[] = await getAllCursus();
  return res.status(200).json({
    success: true,
    message: '',
    data: allCursus,
  });
}

export async function getCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData>>> {
  const cursusId = Number(req.params.id);
  const cursus: CursusData = await getCursus(cursusId);
  return res.status(200).json({
    success: true,
    message: '',
    data: cursus,
  });
}

export async function changeOrderCursusController(req: Request, res: Response) {
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