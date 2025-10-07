import { Request, Response } from 'express';
import { ApiResponse, ElementData } from "../types/Interfaces.js";
import { getAllElements } from '../services/element.service.js';

export async function getAllElementsController(req: Request, res: Response): Promise<Response<ApiResponse<ElementData[]>>> {
  const allElements: ElementData[] = await getAllElements();
  return res.status(200).json({
    success: true,
    message: '',
    data: allElements,
  });
}