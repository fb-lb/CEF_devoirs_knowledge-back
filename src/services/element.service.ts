import { Element } from "../models/Element.js";
import { Image } from "../models/Image.js";
import { Text } from "../models/Text.js";
import { ApiResponse, BaseElement, ElementData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

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

        const fullElementData: ElementData = {
          ...baseElementData,
          type: element.type,
          legend: imageElement.legend,
          source: imageElement.source,
          alternative: imageElement.alternative,
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

// An element is always associated with a text or image so this function
// updates the updatedBy attribut of the associated element
// If you are updated an element, it will update the text/image updatedBy attribut
// If you are updated a text/image, it will update the element updatedBy attribut
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