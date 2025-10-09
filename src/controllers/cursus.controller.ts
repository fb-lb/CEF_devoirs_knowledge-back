import { Request, Response } from 'express';
import { ApiResponse, CursusData } from "../types/Interfaces.js";
import { changeOrderCursus, getAllCursus } from '../services/cursus.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';

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