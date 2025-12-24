import { Request, Response } from "express";
import fs, { promises as fsPromises } from "fs";
import { ApiResponse, ElementData } from "../types/Interfaces.js";
import {
  addImage,
  addText,
  changeOrderElements,
  deleteElement,
  getAllElements,
  getAllElementsAvailable,
  getImageFilePath,
  updateImage,
  updateText,
} from "../services/element.service.js";
import { AppError } from "../utils/AppError.js";
import { getUserIdInRequest } from "../services/user.service.js";
import { getRequestorId, isImageTokenValid } from "../services/token.service.js";
import {
  validateAddImageForm,
  validateAddTextForm,
  validateUpdateImageForm,
  validateUpdateTextForm,
} from "../services/form.service.js";
import path from "path";

/**
 * Handle all elements retrieval.
 *
 * @route GET /api/content/element/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all cursus informations.
 *
 * @returns {Promise<Response<ApiResponse<ElementData[]>>>} Returns:
 * - 200 with a list of objects containing all element informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all elements informations.
 */
export async function getAllElementsController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[]>>> {
  const allElements: ElementData[] = await getAllElements();
  return res.status(200).json({
    success: true,
    message: "",
    data: allElements,
  });
}

/**
 * Handle element order update.
 *
 * @route GET /api/content/element/:id/:move
 * @param {Request} req - Express request containing the ID of the element to move and the movement ('up' | 'down') in URL parameters.
 * @param {Response} res - Express response containing the informations of all the elements.
 *
 * @returns {Promise<Response<ApiResponse<ElementData[] | any>>>} Returns:
 * - 200 with an object containing all the element informations in data property.
 * - 400 if movement is 'up' and element is at first position or if movement is 'down' with element at the last position.
 *
 * @description
 * Steps:
 * - Checks that element ID is provided in URL params,
 * - Checks that move is provided in URL params and equals to 'up' | 'down',
 * - Change the order of the target element,
 * - Get all element informations.
 *
 * @throws {AppError} If no id provided in URL params.
 * @throws {AppError} If move in URL param is not provided or different from 'up' | 'down'.
 */
export async function changeOrderElementsController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[] | any>>> {
  if (!req.params.id)
    throw new AppError(
      400,
      "changeOrderElementsController function in element controller failed : no id provided in url params",
      "Nous ne pouvons changer l'ordre des éléments, car l'identifiant de l'élément n'est pas fourni."
    );
  if (
    !req.params.move ||
    (req.params.move !== "up" && req.params.move !== "down")
  )
    throw new AppError(
      400,
      "changeOrderElementsController function in element controller failed : no move provided in url params",
      "Nous ne pouvons changer l'ordre des éléments, car le changement d'ordre (up ou down) de l'élément n'est pas fourni ou est mal défini."
    );

  const userId = getUserIdInRequest(req);
  const lessonId = parseInt(req.params.id);
  const response = await changeOrderElements(lessonId, req.params.move, userId);
  if (!response.success)
    return res.status(400).json({ success: false, message: response.message });

  const allElements: ElementData[] = await getAllElements();
  return res.status(200).json({
    success: true,
    message: "",
    data: allElements,
  });
}

/**
 * Handle image element creation.
 *
 * @route POST /api/content/element/image/add
 * @param {Request} req - Express request containing the image element informations in the body.
 * @param {Response} res - Express response containing the informations of all the elements.
 *
 * @returns {Promise<Response<ApiResponse<ElementData[]>>>} Returns:
 * - 200 with an object containing all the element informations in data property.
 *
 * @description
 * Steps:
 * - Validates the image element informations,
 * - Gets the requestor ID,
 * - Creates the new image element,
 * - Get all elements informations.
 *
 * @throws {AppError} If req.file.filename is null or undefined, meaning that file saving failed.
 */
export async function addImageController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[]>>> {
  try {
    let allElements = await getAllElements();
    const legend: string = req.body.legend;

    if (!req.file?.filename)
      throw new AppError(
        500,
        "addImageController function in element controller failed : req.file.filename is null or undefined",
        "L'ajout de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support."
      );
    const source: string = req.file.filename;
    const alternative: string = req.body.alternative;
    const lessonId: number = parseInt(req.body.lessonId as string);
    validateAddImageForm(source, alternative, lessonId);

    const requestorId = getRequestorId(
      req.headers.authorization?.split(" ")[1]!
    );

    await addImage(
      lessonId,
      requestorId,
      legend,
      source,
      alternative,
      allElements
    );

    allElements = await getAllElements();

    return res.status(200).json({
      success: true,
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

/**
 * Handle text element creation.
 *
 * @route POST /api/content/element/text/add
 * @param {Request} req - Express request containing the text element informations in the body.
 * @param {Response} res - Express response containing the informations of all the elements.
 *
 * @returns {Promise<Response<ApiResponse<ElementData[]>>>} Returns:
 * - 200 with an object containing all the element informations in data property.
 *
 * @description
 * Steps:
 * - Validates the text element informations,
 * - Gets the requestor ID,
 * - Creates the new text element,
 * - Get all elements informations.
 */
export async function addTextController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[]>>> {
  try {
    let allElements = await getAllElements();
    const rawTextType: string = req.body.textType;
    const content: string = req.body.content;
    const lessonId: number = parseInt(req.body.lessonId as string);
    validateAddTextForm(rawTextType, content, lessonId);

    const textType = rawTextType as
      | "title1"
      | "title2"
      | "title3"
      | "paragraph";

    const requestorId = getRequestorId(
      req.headers.authorization?.split(" ")[1]!
    );

    await addText(lessonId, requestorId, textType, content, allElements);

    allElements = await getAllElements();

    return res.status(200).json({
      success: true,
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

/**
 * Handle element deletion.
 *
 * @route DELETE /api/content/element/:id
 * @param {Request} req - Express request containing the ID of the element to delete in URL parameter.
 * @param {Response} res - Express response containing the informations of all the element.
 *
 * @returns {Promise<Response<ApiResponse<ElementData[]>>>} Returns:
 * - 200 with an object containing all the element informations in data property.
 *
 * @description
 * Steps:
 * - Deletes the target element,
 * - Get all element informations.
 *
 * @throws {AppError} If element ID URL parameter is not provided.
 */
export async function deleteElementController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[]>>> {
  if (!req.params.id)
    throw new AppError(
      422,
      "deleteElementController function in element controller failed : no id provided in url parameter",
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

/**
 * Handle one image retrieval.
 *
 * @route GET /api/content/element/image/public/:filename/:token
 * @route GET /api/content/element/image/private/:filename/:token
 * @param {Request} req - Express request containing the file name of the image to retrieve in URL parameter.
 * @param {Response} res - Express response, sending the file.
 *
 * @returns {void}
 *
 * @description
 * Steps:
 * - Check image token validity.
 * - Retrieves the image file with the provided file name.
 *
 * @throws {AppError} If file name is not provided in url parameter.
 * @throws {AppError} If token is not provided in url parameter.
 * @throws {AppError} If file is not found with provided file name.
 */
export function getPrivateImageController(req: Request, res: Response): void {
  const fileName = req.params.fileName;
  if (!fileName)
    throw new AppError(
      422,
      "getPrivateImageController function in element controller failed : no file name provided in url parameters",
      "Nous ne pouvons pas trouver l'image car son nom n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
    );
  
  const token = req.params.token;

  if (!token)
    throw new AppError(
      422,
      "getPrivateImageController function in element controller failed : no token provided in url parameters",
      "Le token permettant l'accès à cette image n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
    );

  isImageTokenValid(token);
  
  const filePath = getImageFilePath(fileName);

  res.sendFile(filePath);
}

/**
 * Handle text element update.
 *
 * @route PATCH /api/content/element/text/:id
 * @param {Request} req - Express request containing the ID of the text element to update in URL parameter.
 * @param {Response} res - Express response containing the informations of all the ekements.
 *
 * @returns {Promise<Response<ApiResponse<ElementData[]>>>} Returns:
 * - 200 with an object containing all the element informations in data property.
 *
 * @description
 * Steps:
 * - Validates the text element informations,
 * - Updates the targeted text element,
 * - Get all element informations.
 *
 * @throws {AppError} If element ID URL parameter is not provided.
 */
export async function updateTextController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[]>>> {
  if (!req.params.id)
    throw new AppError(
      422,
      "updateTextController function in element controller failed : no element id provided in url paramater",
      "L'identifiant de l'élément n'a pas été fourni avec le formulaire, veuillez contacter le support pour solutionner le problème au plus vite."
    );

  const elementId = Number(req.params.id);

  const rawNewTextType: string = req.body.textType;
  const newContent: string = req.body.content;
  validateUpdateTextForm(rawNewTextType, newContent);

  const newTextType = rawNewTextType as
    | "title1"
    | "title2"
    | "title3"
    | "paragraph";

  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);

  await updateText(elementId, newTextType, newContent, requestorId);

  const allElements = await getAllElements();

  return res.status(200).json({
    success: true,
    message: "L'élément texte a bien été mis à jour.",
    data: allElements,
  });
}

/**
 * Handle image element update.
 *
 * @route PATCH /api/content/element/image/:id
 * @param {Request} req - Express request containing the ID of the image element to update in URL parameter.
 * @param {Response} res - Express response containing the informations of all the ekements.
 *
 * @returns {Promise<Response<ApiResponse<ElementData[]>>>} Returns:
 * - 200 with an object containing all the element informations in data property.
 *
 * @description
 * Steps:
 * - Retrieve the image element to update,
 * - Validates the image element informations,
 * - Replace the saved file by the file sent if file name has changed,
 * - Updates the targeted image element,
 * - Get all element informations.
 *
 * @throws {AppError} If req.file.filename is null or undefined, meaning that file saving failed.
 * @throws {AppError} If image element is not found with the provided ID.
 * @throws {AppError} If element found is not an image.
 * @throws {AppError} If a file deletion failed.
 * @throws {AppError} If an unpexcted error occurs during the update.
 */
export async function updateImageController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[]>>> {
  try {
    if (!req.file?.filename)
      throw new AppError(
        500,
        "updateImageController function in element controller failed : req.file.filename is null or undefined",
        "La mise à jour de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support."
      );
    const newSource: string = req.file.filename;

    const elementId = Number(req.params.id);

    let allElements = await getAllElements();
    const elementData = allElements.find((element) => element.id === elementId);

    if (!elementData)
      throw new AppError(
        404,
        "updateImageController function in element controller failed : element not found with provided id",
        "La mise à jour de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support."
      );

    if (elementData.type !== "image")
      throw new AppError(
        404,
        "updateImageController function in element controller failed : element found is not an image",
        "La mise à jour de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support."
      );

    const sourceToTest = req.body.source;
    const isImageFileUpdated = elementData.source !== sourceToTest;

    const newLegend: string = req.body.legend;
    const newAlternative: string = req.body.alternative;

    validateUpdateImageForm(newSource, newAlternative);

    const requestorId = getRequestorId(
      req.headers.authorization?.split(" ")[1]!
    );

    if (isImageFileUpdated) {
      await updateImage(
        elementId,
        newAlternative,
        newLegend,
        newSource,
        requestorId
      );

      const oldSourcePath = path.join(req.file.destination, elementData.source);
      if (fs.existsSync(oldSourcePath)) await fsPromises.unlink(oldSourcePath);
    } else {
      await updateImage(
        elementId,
        newAlternative,
        newLegend,
        elementData.source,
        requestorId
      );

      const newSourcePath = path.join(req.file.destination, newSource);
      if (fs.existsSync(newSourcePath)) await fsPromises.unlink(newSourcePath);
    }

    allElements = await getAllElements();

    return res.status(200).json({
      success: true,
      message: "L'élément a bien été mis à jour.",
      data: allElements,
    });
  } catch (error: any) {
    if (req.file?.path) {
      try {
        await fsPromises.unlink(req.file.path);
      } catch (error: any) {
        throw new AppError(
          500,
          "updateImageController function in element controller failed a second time : can't delete uploaded file",
          "La mise à jour de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
          { cause: error }
        );
      }
    }

    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateImageController function in element controller failed",
      "La mise à jour de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Handle the retrieval of the elements available for the user who made the request.
 *
 * @route GET /api/content/element/user/all
 * @param {Request} req - Express request containing the ID of the user concerned in the token (in Authorization header).
 * @param {Response} res - Express response containing the informations of the available elements for the requestor.
 *
 * @returns {Promise<Response<ApiResponse<ElementData>>>} Returns:
 * - 200 with an object containing the informations of the elements concerned in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the requestor.
 * - Finds the available elements for the requestor.
 */
export async function getAllElementsAvailableController(
  req: Request,
  res: Response
): Promise<Response<ApiResponse<ElementData[]>>> {
  const requestorId = getRequestorId(req.headers.authorization?.split(" ")[1]!);

  const allElementsAvailable = await getAllElementsAvailable(requestorId);

  return res.status(200).json({
    success: true,
    message: "",
    data: allElementsAvailable,
  });
}
