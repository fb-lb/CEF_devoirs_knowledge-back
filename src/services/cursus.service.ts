import Sequelize, { Op } from "sequelize";
import { Cursus } from "../models/Cursus.js";
import { ApiResponse, CursusData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { deleteImageFiles } from "./element.service.js";
import { Theme } from "../models/Theme.js";

/**
 * Retrieves all cursus from the database.
 * 
 * @async
 * @function getAllCursus
 * 
 * @returns {Promise<CursusData[]>} A list of objects containing informations of all cursus.
 * 
 * @throws {AppError} If an unexpected error occurs during cursus retrieval.
 */
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

/**
 * Retrieves a cursus in the database with its ID.
 * 
 * @async
 * @function getCursus
 * 
 * @param {number} cursusId - The ID used to retrieve the cursus.
 * 
 * @returns {Promise<CursusData>} An object containing the cursus informations.
 * 
 * @throws {AppError} If the cursus is not found with provided ID.
 * @throws {AppError} If an error occurs during cursus retrieval.
 */
export async function getCursus(cursusId: number): Promise<CursusData> {
  try {
    const cursus = await Cursus.findByPk(cursusId);
    if (!cursus) throw new AppError(
      404,
      'getCursus function in cursus service failed : cursus not found with provided id',
      "Le cursus n'a pas été retrouvé avec l'identifiant fourni, veuillez contacter le support pour solutionner le problème au plus vite",
    )

    const cursusData = {
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
    
    return cursusData;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getCursus function in cursus service failed",
      "La récupération du cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Updates a cursus order property and swap with a cursus according to the move.
 * 
 * @async
 * @function changeOrderCursus
 * 
 * @param {number} cursusId - The ID used to retrieve the cursus whose order must be updated.
 * @param {'up' | 'down'} move - Direction of the movement : 'up' decreases the order by 1 and 'down' increases it by 1.
 * @param {number} userId - The ID of the user performing the update.
 * 
 * @returns {Promise<ApiResponse>} 
 * Returns `{ success: false }` if the order update is not possible (first or last position)
 * and `{ success: true }` when the order has been successfully updated.
 * 
 * @throws {AppError} If the target cursus is not found with provided ID.
 * @throws {AppError} If cursus to swap is not found in the database.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
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

/**
 * Creates a new cursus after verifying that the name is unique between cursus in the same theme.
 * 
 * @async
 * @function addCursus
 * 
 * @param {string} cursusName - The name of the cursus to add.
 * @param {string} price - Price of the new cursus.
 * @param {CursusData[]} cursusInSameTheme - The list of existing cursus (in the same theme) used to ensure name uniqueness.
 * @param {number} requestorId - The ID of the user who creates the cursus.
 * @param {number} themeId - The ID of the theme containing the new cursus. 
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If a curus with the same name already exists.
 * @throws {AppError} If an unexpected error occurs during cursus creation.
 */
export async function addCursus(cursusName: string, price: number, cursusInSameTheme: CursusData[], requestorId: number, themeId: number): Promise<void> {
  for (const cursus of cursusInSameTheme) {
    if (cursus.name === cursusName) throw new AppError(
      422,
      "addCursus function in cursus service failed",
      "Un cursus porte déjà ce nom au sein de ce thème, veuillez choisir un cursus avec un nom différent.",
    );
  }

  try {
    await Cursus.create({
      name: cursusName,
      theme_id: themeId,
      price: price,
      order: cursusInSameTheme.length + 1,
      createdBy: requestorId,
      updatedBy: null,
    });
  } catch (error: any) {
    throw new AppError(
      500,
      "addCursus function in cursus service failed",
      "L'ajout d'un nouveau cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Deletes a cursus in the database with its ID, image files of lessons in this cursus and decreases by one order of the other cursus in the same theme.
 * 
 * @async
 * @function deleteCursus
 * 
 * @param {number} cursusId - ID used to retrieve the cursus to delete.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the cursus to delete is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the cursus deletion.
 */
export async function deleteCursus(cursusId: number): Promise<void> {
  try {
    const cursusToDelete = await Cursus.findByPk(cursusId);
    if (!cursusToDelete) throw new AppError(
      404,
      "deleteCursus function in cursus service failed : cursus not found with provided id",
      "Le cursus n'a pas pu être retrouvé avec l'identifiant fourni, veuillez réessayer ultérieurement ou contacter le support.",
    );

    // Delete images files in all lessons of this cursus
    await deleteImageFiles('cursus', cursusId);

    // Decrease by 1 order of cursus with order greater than order of cursus to delete
    await Cursus.update(
      { order: Sequelize.literal('`order` - 1') },
      { where: { 
          order: { [Op.gt]: cursusToDelete.order },
          theme_id: cursusToDelete.theme_id,
        }
      }
    );

    await cursusToDelete.destroy();
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteCursus function in cursus service failed",
      "La suppression du cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Update a cursus retrieved by its ID.
 * 
 * @async
 * @function updateCursus
 * 
 * @param {number} cursusId - The ID of the cursus to update.
 * @param {string} newCursusName - The new name of the cursus to update.
 * @param {number} newCursusPrice - The new price of the cursus to update.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the cursus to update is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function updateCursus(cursusId: number, newCursusName: string, newCursusPrice: number, requestorId: number): Promise<void> {
  try {
    const cursusToUpdate = await Cursus.findByPk(cursusId);
    if(!cursusToUpdate) throw new AppError(
      404,
      "updateCursus function in cursus service failed : cursus not found with provided cursus id",
      "Le cursus qui doit être modifié n'a pas été retrouvé en base de données, veuillez contacter le support.",
    );

    await cursusToUpdate.update({ name: newCursusName, price: newCursusPrice, updatedBy: requestorId });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateCursus function in cursus service failed",
      "La mise à jour du cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Retrieves the theme ID of the theme containing a specific cursus.
 * 
 * @async
 * @function getThemeIdForThisCursus
 * 
 * @param {number} cursusId - The ID of the cursus used to know which theme ID is wanted.
 *  
 * @returns {Promise<number>} The ID of the theme containing the cursus. 
 * 
 * @throws {AppError} If cursus is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during theme ID retrieval.
 */
export async function getThemeIdForThisCursus(cursusId: number): Promise<number> {
  try {
    const cursus = await Cursus.findByPk(cursusId, {
      include: [
        {
          model: Theme,
          as: 'IncludedInTheme',
        }
      ]
    });

    if(!cursus) throw new AppError(
      404,
      "getThemeIdForThisCursus function in cursus service failed : cursus not found with provided id",
      "Cursus non trouvé avec l'identifiant fourni",
    )
    const themeId = cursus.IncludedInTheme.dataValues.id;
    return themeId;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getThemeIdForThisCursus function in cursus service failed",
      "La recherche de l'identifiant du thème du cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}