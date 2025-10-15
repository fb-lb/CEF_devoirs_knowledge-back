import { Request, Response } from 'express';
import { ApiResponse, ElementData } from "../types/Interfaces.js";
import { changeOrderElements, getAllElements } from '../services/element.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';

export async function getAllElementsController(req: Request, res: Response): Promise<Response<ApiResponse<ElementData[]>>> {
  const allElements: ElementData[] = await getAllElements();
  return res.status(200).json({
    success: true,
    message: '',
    data: allElements,
  });
}

export async function changeOrderElementsController(req: Request, res: Response) {
  if (!req.params.id) throw new AppError(
    400,
    'changeOrderElementsController function in element controller failed : no id provided in url params',
    "Nous ne pouvons changer l'ordre des éléments, car l'identifiant de l'élément n'est pas fourni."
  )
  if (!req.params.move || (req.params.move !== 'up' && req.params.move !== 'down')) throw new AppError(
    400,
    'changeOrderElementsController function in element controller failed : no move provided in url params',
    "Nous ne pouvons changer l'ordre des éléments, car le changement d'ordre (up ou down) de l'élément n'est pas fourni ou est mal défini."
  )
  
  const userId = getUserIdInRequest(req);
  const lessonId = parseInt(req.params.id);
  const response = await changeOrderElements(lessonId, req.params.move, userId);
  if (!response.success) return res.status(400).json({ success: false, message: response.message });

  const allElements: ElementData[] = await getAllElements();
  return res.status(200).json({
    success: true,
    message: '',
    data: allElements,
  });
}