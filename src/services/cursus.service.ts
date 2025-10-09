import { Cursus } from "../models/Cursus.js";
import { ApiResponse, CursusData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

export async function getAllCursus(): Promise<CursusData[]> {
  try {
    const allCursus = await Cursus.findAll();
    const allCursusData: CursusData[] = [];
    allCursus.forEach(cursus => {
      const cursusData: CursusData = {
        id: cursus.id,
        themeId: cursus.theme_id,
        name: cursus.name,
        price: cursus.price,
        order: cursus.order,
        createdAt: cursus.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: cursus.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: cursus.createdBy,
        updatedBy: cursus.updatedBy,
      };
      allCursusData.push(cursusData);
    })
    return allCursusData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllCursus function in cursus service failed",
      "La récupération des cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function  changeOrderCursus(cursusId: number, move: 'up' | 'down', userId: number): Promise<ApiResponse> {
  try {
    const targetCursus = await Cursus.findOne({ where: { id: cursusId } });
    if (!targetCursus) throw new AppError(
      404,
      "changeOrderCursus function in cursus service failed : target cursus not found with provided id",
      "Le cursus dont vous souhaitez changer l'ordre n'a pas été retrouvé en base de données."
    );

    if(move === 'up') {
      if (targetCursus.order === 1) return { success: false, message: "Le changement d'ordre n'est pas possible car ce cursus est déjà à la première place."};

      const cursusToSwap = await Cursus.findOne({ where: { theme_id: targetCursus.theme_id, order: targetCursus.order - 1 } });
      if (!cursusToSwap) throw new AppError(
        404,
        "changeOrderCursus function in cursus service failed : cursus to swap not found",
        "Le cursus avec qui il faut échanger l'ordre n'a pas été retrouvé en base de données."
      );

      await cursusToSwap.update({ order: cursusToSwap.order += 1, updatedBy: userId });
      await targetCursus.update({ order: targetCursus.order -= 1, updatedBy: userId });
    } else if (move === 'down') {
      const allCursusInTheme = await Cursus.findAll({ where: { theme_id: targetCursus.theme_id } });
      if (targetCursus.order === allCursusInTheme.length) return { success: false, message: "Le changement d'ordre n'est pas possible car ce cursus est déjà à la dernière place."};
      
      const cursusToSwap = allCursusInTheme.find(cursus => cursus.order === targetCursus.order + 1);
      if (!cursusToSwap) throw new AppError(
        404,
        "changeOrderCursus function in cursus service failed : cursus to swap not found",
        "Le cursus avec qui il faut échanger l'ordre n'a pas été retrouvé en base de données."
      );

      await cursusToSwap.update({ order: cursusToSwap.order -= 1, updatedBy: userId });
      await targetCursus.update({ order: targetCursus.order += 1, updatedBy: userId });
    }

    return { success: true, message: ''};
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "changeOrderCursus function in cursus service failed",
      "Le changement d'ordre des cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}