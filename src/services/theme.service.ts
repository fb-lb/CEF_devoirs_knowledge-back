import Sequelize, { Op } from "sequelize";
import { Theme } from "../models/Theme.js";
import { ApiResponse, ThemeData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { deleteImageFiles } from "./element.service.js";


/**
 * Retrieves all themes from the database.
 * 
 * @async
 * @function getAllThemes
 * 
 * @returns {Promise<ThemeData[]>} A list of objects containing informations of all themes.
 * 
 * @throws {AppError} If an unexpected error occurs during themes retrieval.
 */
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

/**
 * Retrieves a theme in the database with its ID.
 * 
 * @async
 * @function getTheme
 * 
 * @param {number} themeId - The ID used to retrieve the theme.
 * 
 * @returns {Promise<ThemeData>} An object containing the theme informations.
 * 
 * @throws {AppError} If the theme is not found with provided ID
 * @throws {AppError} If an error occurs during theme retrieval
 */
export async function getTheme(themeId: number): Promise<ThemeData> {
  try {
    const theme = await Theme.findByPk(themeId);
    if (!theme) throw new AppError(
      404,
      'getTheme function in theme service failed : theme not found with provided id',
      "Le thème n'a pas été retrouvé avec l'identifiant fourni, veuillez contacter le support pour solutionner le problème au plus vite",
    )

    const themeData: ThemeData = {
        id: theme.id,
        name: theme.name,
        order: theme.order,
        createdAt: theme.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: theme.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: theme.createdBy,
        updatedBy: theme.updatedBy,
    };
    
    return themeData;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getTheme function in theme service failed",
      "La récupération du thème a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Updates a theme order property and swap with a theme according to the move.
 * 
 * @async
 * @function changeOrderThemes
 * 
 * @param {number} themeId - The ID used to retrieve the theme whose order must be updated.
 * @param {'up' | 'down'} move - Direction of the movement : 'up' decreases the order by 1 and 'down' increases it by 1.
 * @param {number} userId - The ID of the user performing the update.
 * 
 * @returns {Promise<ApiResponse>} 
 * Returns `{ success: false }` if the order update is not possible (first or last position)
 * and `{ success: true }` when the order has been successfully updated.
 * 
 * @throws {AppError} If the target theme is not found with provided ID.
 * @throws {AppError} If theme to swap is not found in the database.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function changeOrderThemes(themeId: number, move: 'up' | 'down', userId: number): Promise<ApiResponse> {
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

/**
 * Creates a new theme after verifying that the name is unique.
 * 
 * @async
 * @function addTheme
 * 
 * @param {string} themeName - The name of the theme to add.
 * @param {ThemeData[]} allThemes - The list of existing themes used to ensure name uniqueness.
 * @param {number} requestorId - The ID of the user who creates the theme.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If a theme with the same name already exists.
 * @throws {AppError} If an unexpected error occurs during theme creation.
 */
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

/**
 * Deletes a theme in the database with its ID and decreases other theme order by one.
 * 
 * @async
 * @function deleteTheme
 * 
 * @param {number} themeId - ID used to retrieve the theme to delete.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the theme to delete is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the theme deletion.
 */
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

/**
 * Update a theme name retrieved by its ID.
 * 
 * @async
 * @function updateTheme
 * 
 * @param {number} themeId - The ID of the theme to update.
 * @param {string} newThemeName - The new name of the theme to update.
 * @param {number} requestorId - The Id of the user performing the update.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the theme to update is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function updateTheme(themeId: number, newThemeName: string, requestorId: number): Promise<void> {
  try {
    const themeToUpdate = await Theme.findByPk(themeId);
    if(!themeToUpdate) throw new AppError(
      404,
      "updateTheme function in theme service failed : theme not found with provided theme id",
      "Le thème qui doit être modifié n'a pas été retrouvé en base de données, veuillez contacter le support.",
    );

    await themeToUpdate.update({ name: newThemeName, updatedBy: requestorId });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateTheme function in theme service failed",
      "La mise à jour du thème a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}