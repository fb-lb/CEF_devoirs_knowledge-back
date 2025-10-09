import { Theme } from "../models/Theme.js";
import { ApiResponse, ThemeData } from "../types/Interfaces.js";
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

export async function  changeOrderThemes(themeId: number, move: 'up' | 'down', userId: number): Promise<ApiResponse> {
  try {
    const targetTheme = await Theme.findOne({ where: { id: themeId } });
    if (!targetTheme) throw new AppError(
      404,
      "changeOrderThemes function in theme service failed : target theme not found with provided id",
      "Le thème dont vous souhaitez changer l'ordre n'a pas été retrouvé en base de données."
    );

    if(move === 'up') {
      if (targetTheme.order === 1) return { success: false, message: "Le changement d'ordre n'est pas possible car ce thème est déjà à la première place."};

      const themeToSwap = await Theme.findOne({ where: { order: targetTheme.order - 1 } });
      if (!themeToSwap) throw new AppError(
        404,
        "changeOrderThemes function in theme service failed : theme to swap not found",
        "Le thème avec qui il faut échanger l'ordre n'a pas été retrouvé en base de données."
      );

      await themeToSwap.update({ order: themeToSwap.order += 1, updatedBy: userId });
      await targetTheme.update({ order: targetTheme.order -= 1, updatedBy: userId });
    } else if (move === 'down') {
      const allTheme = await Theme.findAll();
      if (targetTheme.order === allTheme.length) return { success: false, message: "Le changement d'ordre n'est pas possible car ce thème est déjà à la dernière place."};
      
      const themeToSwap = allTheme.find(theme => theme.order === targetTheme.order + 1);
      if (!themeToSwap) throw new AppError(
        404,
        "changeOrderThemes function in theme service failed : theme to swap not found",
        "Le thème avec qui il faut échanger l'ordre n'a pas été retrouvé en base de données."
      );

      await themeToSwap.update({ order: themeToSwap.order -= 1, updatedBy: userId });
      await targetTheme.update({ order: targetTheme.order += 1, updatedBy: userId});
    }

    return { success: true, message: ''};
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "changeOrderThemes function in theme service failed",
      "Le changement d'ordre des thèmes a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}