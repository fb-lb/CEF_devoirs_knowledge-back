import { Request, Response } from 'express';
import fs, { promises as fsPromises } from 'fs';
import { ApiResponse, ElementData } from "../types/Interfaces.js";
import { addImage, addText, changeOrderElements, deleteElement, getAllElements } from '../services/element.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { getRequestorId } from '../services/token.service.js';
import { validateAddImageForm, validateAddTextForm } from '../services/form.service.js';
import path from 'path';
import { fileURLToPath } from 'url';

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

export async function addImageController(req: Request, res: Response): Promise<Response<ApiResponse<ElementData[]>>> {
  try {
    let allElements = await getAllElements();
    const legend: string = req.body.legend;
    
    if (!req.file?.filename) throw new AppError(
      500,
      "addImageController function in element controller failed : req.file.filename is null or undefined",
      "L'ajout de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
    );
    const source: string = req.file.filename;
    const alternative: string = req.body.alternative;
    const lessonId: number = parseInt(req.body.lessonId as string);
    validateAddImageForm(source, alternative, lessonId);

    const requestorId = getRequestorId(req.cookies.token);

    await addImage(lessonId, requestorId, legend, source, alternative, allElements);
    
    allElements = await getAllElements();
    
    return res.status(200).json({
      surccess: true,
      message: "L'élément a bien été ajouté à la leçon.",
      data: allElements,
    });
  } catch (error: any) {
    if (req.file?.path) {
      try {
        await fsPromises.unlink(req.file.path);
      } catch (error: any) {
        throw new AppError(
          500,
          "addImageController function in element controller failed a second time : can't delete uploaded file",
          "L'ajout de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
          { cause: error }
        );
      }
    }

    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "addImageController function in element controller failed",
      "L'ajout de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function addTextController(req: Request, res: Response): Promise<Response<ApiResponse<ElementData[]>>> {
  try {
    let allElements = await getAllElements();
    const rawTextType: string = req.body.textType;
    const content: string = req.body.content;
    const lessonId: number = parseInt(req.body.lessonId as string);
    validateAddTextForm(rawTextType, content, lessonId);

    const textType = rawTextType as 'title1' | 'title2' | 'title3' | 'paragraph';

    const requestorId = getRequestorId(req.cookies.token);

    await addText(lessonId, requestorId, textType, content, allElements);
    
    allElements = await getAllElements();
    
    return res.status(200).json({
      surccess: true,
      message: "L'élément a bien été ajouté à la leçon.",
      data: allElements,
    });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "addTextController function in element controller failed",
      "L'ajout de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function deleteElementController(req: Request, res: Response): Promise<Response<ApiResponse<ElementData[]>>> {
  if(!req.params.id) throw new AppError(
    422,
    'deleteElementController function in element controller failed : no id provided in url parameter',
    "L'élément n'a pas pu être retrouvé car son identifiant n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );

  const elementId = parseInt(req.params.id);
  await deleteElement(elementId);

  const allElements = await getAllElements();
  return res.status(200).json({
    success: true,
    message: "L'élément a bien été supprimé.",
    data: allElements,
  });
}

export function getImageController(req: Request, res: Response): void {
  const fileName = req.params.fileName;
  if(!fileName) throw new AppError(
    422,
    'getImageController function in element controller failed : no file name provided in url parameters',
    "Nous ne pouvons pas trouver l'image car son nom n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, '../../uploads/elements_images', fileName);

  if(!fs.existsSync(filePath)) throw new AppError(
    404,
    'getImageController function in element controller failed : image not found with provided file name',
    "Nous ne pouvons pas trouver l'image avec le nom fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );

  res.sendFile(filePath);
}