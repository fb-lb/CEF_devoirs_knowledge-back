import { Theme } from "../models/Theme.js";
import { ThemeData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

export async function getAllThemes(): Promise<ThemeData[]> {
  try {
    const allThemes = await Theme.findAll();
    const allThemesData: ThemeData[] = [];
    allThemes.forEach(theme => {
      const themeData: ThemeData = {
        id: theme.id,
        name: theme.name,
        order: theme.order,
        createdAt: theme.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: theme.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: theme.createdBy,
        updatedBy: theme.updatedBy,
      };
      allThemesData.push(themeData);
    })
    return allThemesData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllThemes function in theme service failed",
      "La récupération des thèmes a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}