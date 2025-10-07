import { Element } from "../models/Element.js";
import { Image } from "../models/Image.js";
import { Text } from "../models/Text.js";
import { ElementData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

export async function getAllElements(): Promise<ElementData[]> {
  try {
    const allElements = await Element.findAll();
    const allElementsData: ElementData[] = [];

    for (const element of allElements) {
      const elementData: ElementData = {
        id: element.id,
        lessonId: element.lesson_id,
        type: element.type,
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

        elementData.content = textElement.content;
      }

      if (element.type === 'image') {
        const imageElement = await Image.findOne({ where: { element_id: element.id } });
        if (!imageElement) throw new AppError(404, 
          'imageElement not found with element id, getAllElements function failed in element service',
          "Nous ne parvenons pas à retrouver les informations d'un élément image en base de données, veuillez contacter le support",
        );

        elementData.source = imageElement.source;
        elementData.alternative = imageElement.alternative;
      }
      allElementsData.push(elementData);
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