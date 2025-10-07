import { Cursus } from "../models/Cursus.js";
import { CursusData } from "../types/Interfaces.js";
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