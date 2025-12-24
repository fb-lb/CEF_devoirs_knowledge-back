import Sequelize, { Op } from "sequelize";
import { Element } from "../models/Element.js";
import { Image } from "../models/Image.js";
import { Text } from "../models/Text.js";
import { ApiResponse, BaseElement, ElementData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { fileURLToPath } from "url";
import path from "path";
import { Cursus } from "../models/Cursus.js";
import { Lesson } from "../models/Lesson.js";
import fs, { promises as fsPromises } from "fs";
import { UserLesson } from "../models/User-Lesson.js";
import { generateImageToken } from "./token.service.js";

/**
 * Retrieves all elements from the database with relative informations if its type is 'text' or 'image'.
 * 
 * @async
 * @function getAllElements
 * 
 * @returns {Promise<ElementData[]>} A list of objects containing informations of all elements.
 * 
 * @throws {AppError} If a text or an image is not found in the database.
 * @throws {AppError} If an unexpected error occurs during elements retrieval.
 */
export async function getAllElements(): Promise<ElementData[]> {
  try {
    const allElements = await Element.findAll();
    const allElementsData: ElementData[] = [];

    for (const element of allElements) {
      const baseElementData: BaseElement = {
        id: element.id,
        lessonId: element.lesson_id,
        order: element.order,
        createdAt: element.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: element.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: element.createdBy,
        updatedBy: element.updatedBy,
      };

      if(element.type === 'text') {
        const textElement = await Text.findOne({ where: { element_id : element.id } });
        if (!textElement) throw new AppError(404, 
          'textElement not found with element id, getAllElements function failed in element service',
          "Nous ne parvenons pas à retrouver les informations d'un élément texte en base de données, veuillez contacter le support",
        );

        const fullElementData: ElementData = {
          ...baseElementData,
          type: element.type,
          textType: textElement.type,
          content: textElement.content,
        }

        allElementsData.push(fullElementData);
      }

      if (element.type === 'image') {
        const imageElement = await Image.findOne({ where: { element_id: element.id } });
        if (!imageElement) throw new AppError(404, 
          'imageElement not found with element id, getAllElements function failed in element service',
          "Nous ne parvenons pas à retrouver les informations d'un élément image en base de données, veuillez contacter le support",
        );

        const token = generateImageToken(imageElement.id);

        const fullElementData: ElementData = {
          ...baseElementData,
          type: element.type,
          legend: imageElement.legend,
          source: imageElement.source,
          alternative: imageElement.alternative,
          token: token,
        }

        allElementsData.push(fullElementData);
      }
    }
    return allElementsData;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getAllElements function in element service failed",
      "La récupération des éléments (textes, images) a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Retrieves all elements available for a specific user from the database with relative informations if element's type is 'text' or 'image'.
 * 
 * @async
 * @function getAllElementsAvailable
 * 
 * @param {number} userId - The ID the user used to find accessible lessons for this user and then know accessible elements.
 * 
 * @returns {Promise<ElementData[]>} A list of objects containing informations of all elements avaible for this user.
 * 
 * @throws {AppError} If an unexpected error occurs during elements retrieval.
 */
export async function getAllElementsAvailable(userId: number): Promise<ElementData[]> {
  try {
    const allUserLessons = await UserLesson.findAll({ where: { user_id: userId } });
    const allLessonsIdAvailable: number[] = [];
    for (const userLesson of allUserLessons) {
      allLessonsIdAvailable.push(userLesson.dataValues.lesson_id);
    }

    const allElementsAvailable = await Element.findAll({
      include: [
        {
          model: Lesson,
          as: 'IncludedInLesson',
          where: {id: { [Op.in]: allLessonsIdAvailable }},
        },
        {
          model: Text,
          as: 'IncludeText',
          required: false,
        },
        {
          model: Image,
          as: 'IncludeImage',
          required: false,
        }
      ],
    });
    
    const allElementsDataAvailable: ElementData[] = [];

    for (const element of allElementsAvailable) {
      const baseElementData: BaseElement = {
        id: element.id,
        lessonId: element.lesson_id,
        order: element.order,
        createdAt: element.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: element.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: element.createdBy,
        updatedBy: element.updatedBy,
      };

      if(element.type === 'text') {
        const fullElementData: ElementData = {
          ...baseElementData,
          type: element.type,
          textType: element.IncludeText.type,
          content: element.IncludeText.content,
        }

        allElementsDataAvailable.push(fullElementData);
      }

      if (element.type === 'image') {
        const token = generateImageToken(element.IncludeImage.id);
        const fullElementData: ElementData = {
          ...baseElementData,
          type: element.type,
          legend: element.IncludeImage.legend,
          source: element.IncludeImage.source,
          alternative: element.IncludeImage.alternative,
          token: token,
        }

        allElementsDataAvailable.push(fullElementData);
      }
    }

    return allElementsDataAvailable;
  } catch (error: any) {
   throw new AppError(
    500,
    'getAllElementsAvailable function in element service failed',
    "La récupération des thèmes disponibles pour cet utilisateur a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
  );
  }
}

/**
 * Retrieves the file path of an image by its file name.
 * 
 * @function getImageFilePath
 * 
 * @param {string} fileName - The name of the file to retrieve.
 * 
 * @returns {string} Returns the file path of the image.
 * 
 * @throws {AppError} If file is not found with provided file name.
 */
export function getImageFilePath(fileName: string): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(
    __dirname,
    "../../uploads/elements_images",
    fileName
  );

  if (!fs.existsSync(filePath))
    throw new AppError(
      404,
      "getImageFilePath function in element service failed : image not found with provided file name",
      "Nous ne pouvons pas trouver l'image avec le nom fourni, veuillez contacter le support pour solutionner le problème au plus vite."
    );
  
  return filePath; 
}

/**
 * Updates an element order property and swap with an element according to the move.
 * 
 * @async
 * @function changeOrderElements
 * 
 * @param {number} elementId - The ID used to retrieve the element whose order must be updated.
 * @param {'up' | 'down'} move - Direction of the movement : 'up' decreases the order by 1 and 'down' increases it by 1.
 * @param {number} userId - The ID of the user performing the update.
 * 
 * @returns {Promise<ApiResponse>} 
 * Returns `{ success: false }` if the order update is not possible (first or last position)
 * and `{ success: true }` when the order has been successfully updated.
 * 
 * @throws {AppError} If the target element is not found with provided ID.
 * @throws {AppError} If element to swap is not found in the database.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function  changeOrderElements(elementId: number, move: 'up' | 'down', userId: number): Promise<ApiResponse> {
  try {
    const targetElement = await Element.findOne({ where: { id: elementId } });
    if (!targetElement) throw new AppError(
      404,
      "changeOrderElements function in element service failed : target element not found with provided id",
      "L'élément dont vous souhaitez changer l'ordre n'a pas été retrouvé en base de données."
    );

    if(move === 'up') {
      if (targetElement.order === 1) return { success: false, message: "Le changement d'ordre n'est pas possible car cet élément est déjà à la première place."};

      const elementToSwap = await Element.findOne({ where: { lesson_id: targetElement.lesson_id, order: targetElement.order - 1 } });
      if (!elementToSwap) throw new AppError(
        404,
        "changeOrderElements function in element service failed : element to swap not found",
        "L'élément avec qui il faut échanger l'ordre n'a pas été retrouvée en base de données."
      );

      updateUpdatedBy(elementToSwap.type, elementToSwap.id, userId);
      updateUpdatedBy(targetElement.type, targetElement.id, userId);

      await elementToSwap.update({ order: elementToSwap.order += 1, updatedBy: userId });
      await targetElement.update({ order: targetElement.order -= 1, updatedBy: userId });
    } else if (move === 'down') {
      const allElementsInLesson = await Element.findAll({ where: { lesson_id: targetElement.lesson_id } });
      if (targetElement.order === allElementsInLesson.length) return { success: false, message: "Le changement d'ordre n'est pas possible car cet élément est déjà à la dernière place."};
      
      const elementToSwap = allElementsInLesson.find(element => element.order === targetElement.order + 1);
      if (!elementToSwap) throw new AppError(
        404,
        "changeOrderElements function in element service failed : element to swap not found",
        "L'élément avec qui il faut échanger l'ordre n'a pas été retrouvé en base de données."
      );

      updateUpdatedBy(elementToSwap.type, elementToSwap.id, userId);
      updateUpdatedBy(targetElement.type, targetElement.id, userId);
      
      await elementToSwap.update({ order: elementToSwap.order -= 1, updatedBy: userId });
      await targetElement.update({ order: targetElement.order += 1, updatedBy: userId });
    }

    return { success: true, message: ''};
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "changeOrderElements function in element service failed",
      "Le changement d'ordre des éléments a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Update the updatedBy property of an element, a text or an image.
 * An element is always associated with a text or image so this function updates the updatedBy attribut of the associated element.
 * If you are updated an element, use this function to update the text/image updatedBy attribut.
 * If you are updated a text/image, use this function to update the element updatedBy attribut.
 * 
 * @async
 * @function updateUpdatedBy
 * 
 * @param {'element' | 'text' | 'image'} type - The model of the saving who has to be updated.
 * @param {number} elementId - The ID of the element used to retrieve the element, text or image.
 * @param {number} userId - The ID of the user performing the update.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the element, text or image is not found.
 * @throws {AppError} If an unexpected error occurs during the update. 
 */
async function updateUpdatedBy(type: 'element' | 'text' | 'image', elementId: number, userId: number): Promise<void> {
  try {
    if (type === 'element') {
      const element = await Element.findByPk(elementId);
      if (!element) throw new AppError(
        404,
        "updateUpdatedBy function in element service failed : element to update updatedBy attribut was not found",
        "L'élément à actualiser n'a pas été retrouvé en base de données."
      );

      await element.update({updatedBy: userId});
    }

    if (type === 'text') {
      const text = await Text.findOne({where: {element_id: elementId}});
      if (!text) throw new AppError(
        404,
        "updateUpdatedBy function in element service failed : text to update updatedBy attribut was not found",
        "Le texte à actualiser n'a pas été retrouvé en base de données."
      );

      await text.update({updatedBy: userId});
    }

    if (type === 'image') {
      const image = await Image.findOne({where: {element_id: elementId}});
      if (!image) throw new AppError(
        404,
        "updateUpdatedBy function in element service failed : image to update updatedBy attribut was not found",
        "L'image à actualiser n'a pas été retrouvé en base de données."
      );

      await image.update({updatedBy: userId});
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateUpdatedBy function in element service failed",
      "L'actualisation complète des éléments dont l'ordre a changé a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Creates a new image element.
 * 
 * @async
 * @function addImage
 * 
 * @param {number} lessonId - The ID of the lesson containing the image element.
 * @param {number} requestorId - The ID of the user who creates the image element.
 * @param {string | null} legend - The legend of the image to create, displaying on front-end.
 * @param {string} source - The image file name.
 * @param {string} alternative - The text used for the alternative attribut of the image on front-end.
 * @param {ElementData[]} allElements - List of object containing all elements informations.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If an unexpected error occurs during image element creation.
 */
export async function addImage(lessonId: number, requestorId: number, legend: string | null, source: string, alternative: string, allElements: ElementData[]): Promise<void> {
  try {
    const elementsInSameLesson = allElements.filter(element => element.lessonId === lessonId);
    const newElement = await Element.create({
      order: elementsInSameLesson.length + 1,
      lesson_id: lessonId,
      type: 'image',
      createdBy: requestorId,
      updatedBy: null,
    });

    const newImage = await Image.create({
      element_id: newElement.id,
      source: source,
      legend: legend,
      alternative: alternative,
      createdBy: requestorId,
      updatedBy: null,
    });
  } catch (error: any) {
    //if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "addImage function in element service failed",
      "L'ajout de l'image à la base de donnée a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Creates a new text element.
 * 
 * @async
 * @function addText
 * 
 * @param {number} lessonId - The ID of the lesson containing the text element.
 * @param {number} requestorId - The ID of the user who creates the text element.
 * @param {'title1' | 'title2' | 'title3' | 'paragraph'} textType - The type of the text element.
 * @param {string} content - The content of the text element, displayed on front-end.
 * @param {ElementData[]} allElements - List of object containing all elements informations.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If an unexpected error occurs during text element creation.
 */
export async function addText(lessonId: number, requestorId: number, textType: 'title1' | 'title2' | 'title3' | 'paragraph', content: string, allElements: ElementData[]): Promise<void> {
  try {
    const elementsInSameLesson = allElements.filter(element => element.lessonId === lessonId);
    const newElement = await Element.create({
      order: elementsInSameLesson.length + 1,
      lesson_id: lessonId,
      type: 'text',
      createdBy: requestorId,
      updatedBy: null,
    });

    const newText = await Text.create({
      element_id: newElement.id,
      type: textType,
      content: content,
      createdBy: requestorId,
      updatedBy: null,
    });
  } catch (error: any) {
    //if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "addText function in element service failed",
      "L'ajout du texte à la base de donnée a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Deletes an element in the database and the text or the image according to type element.
 * Decreases by one other element order in the same lesson if it is higher than the order of the element to delete.
 * If it is an image, it calls deleteImageFiles() function to delete file too.
 * 
 * @async
 * @function deleteElement
 * 
 * @param {number} elementId - ID used to retrieve the element to delete.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the element to delete is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the theme deletion.
 */
export async function deleteElement(elementId: number): Promise<void> {
  try {
    const elementToDelete = await Element.findByPk(elementId);
    if (!elementToDelete) throw new AppError(
      404,
      "deleteElement function in element service failed : element not found with provided id",
      "L'élément n'a pas pu être retrouvé avec l'identifiant fourni, veuillez réessayer ultérieurement ou contacter le support.",
    );

    // Delete image file associated to this element if it is an image
    if (elementToDelete.type === 'image') await deleteImageFiles('element', elementId);

    // Decrease by 1 order of themes with order greater than order of theme to delete
    await Element.update(
      { order: Sequelize.literal('`order` - 1') },
      { where: {
          order: { [Op.gt]: elementToDelete.order },
          lesson_id: elementToDelete.lesson_id,
        } 
      }
    );

    await elementToDelete.destroy();
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteElement function in element service failed",
      "La suppression de l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Deletes image files related to the elements contained in a course ('theme' | 'cursus' | 'lesson' | 'element') retrieved with provided ID.
 * 
 * @async 
 * @function deleteImageFiles
 * 
 * @param {'theme' | 'cursus' | 'lesson' | 'element'} type - The type of course which contains files to delete.
 * @param {number} id - The ID of the course used to retrieve the course ('theme' | 'cursus' | 'lesson' | 'element').
 * 
 * @returns {Promise<void>} 
 * 
 * @throws {AppError} If file to delete is not found with the source property of the element retrieved.
 * @throws {AppError} If an unexpected error occurs during file deletion.
 */
export async function deleteImageFiles(type: 'theme' | 'cursus' | 'lesson' | 'element', id: number): Promise<void> {
  try {
    let imageFileNames: string[] = [];

    if(type === 'theme') {
      const allCursusInTheme = await Cursus.findAll({ where: { theme_id: id } });
      if (allCursusInTheme.length === 0) return;

      const allLessonsInTheme: Lesson[] = [];
      for (const cursus of allCursusInTheme) {
        const allLessonsInCursus = await Lesson.findAll({ where: { cursus_id: cursus.id } });
        for (const lesson of allLessonsInCursus) {
          allLessonsInTheme.push(lesson);
        }
      }
      if (allLessonsInTheme.length === 0) return;

      const allImagesInTheme: Image[] = [];
      for (const lesson of allLessonsInTheme) {
        const allElementsImageInLesson = await Element.findAll({ where: { lesson_id: lesson.id, type: 'image' } });
        for (const element of allElementsImageInLesson) {
          const image = await Image.findOne({ where: { element_id: element.id } });
          if (image) allImagesInTheme.push(image);
        }
      }
      if (allImagesInTheme.length === 0) return;

      for (const image of allImagesInTheme) {
        imageFileNames.push(image.source);
      }
    }

    if (type === 'cursus') {
      const allLessonsInCursus = await Lesson.findAll({ where: { cursus_id: id } });
      if (allLessonsInCursus.length === 0) return;

      const allImagesInCursus: Image[] = [];
      for (const lesson of allLessonsInCursus) {
        const allElementsImageInLesson = await Element.findAll({ where: { lesson_id: lesson.id, type: 'image' } });
        for (const element of allElementsImageInLesson) {
          const image = await Image.findOne({ where: { element_id: element.id } });
          if (image) allImagesInCursus.push(image);
        }
      }
      if (allImagesInCursus.length === 0) return;

      for (const image of allImagesInCursus) {
        imageFileNames.push(image.source);
      }
    }

    if (type === 'lesson') {
      const allImagesInLesson: Image[] = [];

      const allElementsImageInLesson = await Element.findAll({ where: { lesson_id: id, type: 'image' } });
      for (const element of allElementsImageInLesson) {
        const image = await Image.findOne({ where: { element_id: element.id } });
        if (image) allImagesInLesson.push(image);
      }
      if (allImagesInLesson.length === 0) return;

      for (const image of allImagesInLesson) {
        imageFileNames.push(image.source);
      }
    }

    if (type === 'element') {
      const image = await Image.findOne({ where: { element_id: id } });
      if (image) imageFileNames.push(image.source);
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    for (const imageFileName of imageFileNames) {
      const filePath = path.join(__dirname, '../../uploads/elements_images', imageFileName);
      if (fs.existsSync(filePath)) {
        try {
          await fsPromises.unlink(filePath);
        } catch (error: any) {
          throw new AppError(
            404,
            "deleteImageFiles function in element service failed : images not found with file names in database",
            "La suppression des fichiers d'image associés à l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
            { cause: error }
          );
        }
        
      }
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteImageFiles function in element service failed",
      "La suppression des fichiers d'image associés à l'élément a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Updates a text and relative element retrieved with the provided ID.
 * 
 * @async
 * @function updateText
 * 
 * @param {number} elementId - The Id of the element used to retrieve element and text.
 * @param {'title1' | 'title2' | 'title3' | 'paragraph'} newTextType - The new type of the text.
 * @param {string} newContent - The new content of the text.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the element is not found with the provided ID.
 * @throws {AppError} If the text to update is not found with the provided ID.
 * @throws {AppError} If an unexecpted error occurs during the update.
 */
export async function updateText(elementId: number, newTextType: 'title1' | 'title2' | 'title3' | 'paragraph', newContent: string, requestorId: number): Promise<void> {
  try {
    const elementToUpdate = await Element.findByPk(elementId);
    if(!elementToUpdate) throw new AppError(
      404,
      "updateText function in element service failed : element not found with provided element id",
      "L'élément qui doit être modifié n'a pas été retrouvé en base de données, veuillez contacter le support.",
    );

    const textToUpdate = await Text.findOne({ where: { element_id: elementToUpdate.id } });
    if(!textToUpdate) throw new AppError(
      404,
      "updateText function in element service failed : text not found with element id property",
      "Le texte qui doit être modifié n'a pas été retrouvé en base de données, veuillez contacter le support.",
    );

    const updatedAtTextValueBeforeUpdate = textToUpdate.updatedAt.toISOString();
    
    const textUpdated = await textToUpdate.update({ type: newTextType, content: newContent, updatedBy: requestorId });

    if (updatedAtTextValueBeforeUpdate !== textUpdated.updatedAt.toISOString()) {
      elementToUpdate.set('updatedBy', requestorId);
      elementToUpdate.changed('updatedAt', true );
      await elementToUpdate.save();
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateText function in element service failed",
      "La mise à jour de l'élément texte a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Updates an image and relative element retrieved with the provided ID.
 * 
 * @async
 * @function updateImage
 * 
 * @param {number} elementId - The ID of the element used to retrieve the element and the image.
 * @param {string} newAlternative - The new alternative text of the image.
 * @param {string | null} newLegend - The new legend of the image.
 * @param {string} newSource - The new file name of the image.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the element is not found with the provided ID.
 * @throws {AppError} If the image to update is not found with the provided ID.
 * @throws {AppError} If an unexecpted error occurs during the update.
 */
export async function updateImage(elementId: number, newAlternative: string, newLegend: string | null, newSource: string, requestorId: number): Promise<void> {
  try {
    const elementToUpdate = await Element.findByPk(elementId);
    if(!elementToUpdate) throw new AppError(
      404,
      "updateImage function in element service failed : element not found with provided element id",
      "L'élément qui doit être modifié n'a pas été retrouvé en base de données, veuillez contacter le support.",
    );

    const imageToUpdate = await Image.findOne({ where: { element_id: elementToUpdate.id } });
    if(!imageToUpdate) throw new AppError(
      404,
      "updateImage function in element service failed : image not found with element id property",
      "L'image qui doit être modifiée n'a pas été retrouvée en base de données, veuillez contacter le support.",
    );

    const updatedAtImageValueBeforeUpdate = imageToUpdate.updatedAt.toISOString();
    
    const imageUpdated = await imageToUpdate.update({ alternative: newAlternative, legend: newLegend, source: newSource, updatedBy: requestorId });
    
    if (updatedAtImageValueBeforeUpdate !== imageUpdated.updatedAt.toISOString()) {
      elementToUpdate.set('updatedBy', requestorId);
      elementToUpdate.changed('updatedAt', true );
      await elementToUpdate.save();
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateImage function in element service failed",
      "La mise à jour de l'élément image a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}