import { Request, Response } from 'express';
import { ApiResponse, CursusData } from "../types/Interfaces.js";
import { addCursus, changeOrderCursus, getAllCursus } from '../services/cursus.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { getRequestorId } from '../services/token.service.js';
import { validateAddCursusForm } from '../services/form.service.js';

export async function getAllCursusController(req: Request, res: Response): Promise<Response<ApiResponse<CursusData[]>>> {
  const allCursus: CursusData[] = await getAllCursus();
  return res.status(200).json({
    success: true,
    message: '',
    data: allCursus,
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

  return res.status(200).json({
    success: true,
    message: `Le cursus ${cursusName} a bien été ajouté`,
    data: allCursus,
  });
}