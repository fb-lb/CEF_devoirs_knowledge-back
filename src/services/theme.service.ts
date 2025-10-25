import Sequelize, { Op } from "sequelize";
import { Theme } from "../models/Theme.js";
import { ApiResponse, ThemeData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { fileURLToPath } from "url";
import path from "path";
import { deleteImageFiles } from "./element.service.js";

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

export async function addTheme(themeName: string, allThemes: ThemeData[], requestorId: number): Promise<void> {
  for (const theme of allThemes) {
    if (theme.name === themeName) throw new AppError(
      422,
      "addTheme function in theme service failed",
      "Un thème porte déjà ce nom, veuillez choisir un thème avec un nom différent.",
    );
  }

  try {
    await Theme.create({
      name: themeName,
      order: allThemes.length + 1,
      createdBy: requestorId,
      updatedBy: null,
    });
  } catch (error: any) {
    throw new AppError(
      500,
      "addTheme function in theme service failed",
      "L'ajout d'un nouveau thème a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function deleteTheme(themeId: number): Promise<void> {
  try {
    const themeToDelete = await Theme.findByPk(themeId);
    if (!themeToDelete) throw new AppError(
      404,
      "deleteTheme function in theme service failed : theme not found with provided id",
      "Le thème n'a pas pu être retrouvé avec l'identifiant fourni, veuillez réessayer ultérieurement ou contacter le support.",
    );

    // Delete images files in all lessons in all cursus of this theme
    await deleteImageFiles('theme', themeId);

    // Decrease by 1 order of themes with order greater than order of theme to delete
    await Theme.update(
      { order: Sequelize.literal('`order` - 1') },
      { where: { order: { [Op.gt]: themeToDelete.order } } }
    );

    await themeToDelete.destroy();
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteTheme function in theme service failed",
      "La suppression du thème a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}