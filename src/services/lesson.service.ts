import Sequelize, { Op } from "sequelize";
import { Lesson } from "../models/Lesson.js";
import { ApiResponse, LessonData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { deleteImageFiles } from "./element.service.js";
import { Cursus } from "../models/Cursus.js";
import { Theme } from "../models/Theme.js";

/**
 * Retrieves all lessons from the database.
 * 
 * @async
 * @function getAllLessons
 * 
 * @returns {Promise<LessonData[]>} A list of objects containing informations of all lessons.
 * 
 * @throws {AppError} If an unexpected error occurs during lessons retrieval.
 */
export async function getAllLessons(): Promise<LessonData[]> {
  try {
    const allLessons = await Lesson.findAll();
    const allLessonsData: LessonData[] = [];
    allLessons.forEach(lesson => {
      const lessonData: LessonData = {
        id: lesson.id,
        cursusId: lesson.cursus_id,
        name: lesson.name,
        price: lesson.price,
        order: lesson.order,
        createdAt: lesson.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: lesson.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: lesson.createdBy,
        updatedBy: lesson.updatedBy,
      };
      allLessonsData.push(lessonData);
    })
    return allLessonsData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllLessons function in lesson service failed",
      "La récupération des leçons a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Get all lessons included in a specific cursus.
 * 
 * @async
 * @function getLessonsInCursus
 * 
 * @param {number} cursusId - The ID of the cursus containing the lessons that have to be retrieved.
 *  
 * @returns {Promise<LessonData[]>}  A list of objects containing informations of all lessons included in specified cursus.
 * 
 * @throws {AppError} If an unexpected error occurs during lessons retrieval.
 */
export async function getLessonsInCursus(cursusId: number): Promise<LessonData[]> {
  try {
    const lessonsInCursus = await Lesson.findAll({ where: { cursus_id: cursusId } });
    const lessonsInCursusData: LessonData[] = [];
    lessonsInCursus.forEach(lesson => {
      const lessonData: LessonData = {
        id: lesson.id,
        cursusId: lesson.cursus_id,
        name: lesson.name,
        price: lesson.price,
        order: lesson.order,
        createdAt: lesson.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: lesson.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: lesson.createdBy,
        updatedBy: lesson.updatedBy,
      };
      lessonsInCursusData.push(lessonData);
    });
    return lessonsInCursusData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getLessonsInCursus function in lesson service failed",
      "La récupération des leçons du cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Retrieves a lesson in the database with its ID.
 * 
 * @async
 * @function getLesson
 * 
 * @param {number} lessonId - The ID used to retrieve the lesson.
 * 
 * @returns {Promise<LessonData>} An object containing the lesson informations.
 * 
 * @throws {AppError} If the lesson is not found with provided ID.
 * @throws {AppError} If an error occurs during lesson retrieval.
 */
export async function getLesson(lessonId: number): Promise<LessonData> {
  try {
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) throw new AppError(
      404,
      'getLesson function in lesson service failed : lesson not found with provided id',
      "La leçon n'a pas été retrouvée avec l'identifiant fourni, veuillez contacter le support pour solutionner le problème au plus vite",
    )

    const lessonData = {
        id: lesson.id,
        cursusId: lesson.cursus_id,
        name: lesson.name,
        price: lesson.price,
        order: lesson.order,
        createdAt: lesson.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: lesson.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: lesson.createdBy,
        updatedBy: lesson.updatedBy,
    };
    
    return lessonData;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getLesson function in lesson service failed",
      "La récupération de la leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Updates a lesson order property and swap with a lesson according to the move.
 * 
 * @async
 * @function changeOrderLessons
 * 
 * @param {number} lessonId - The ID used to retrieve the lesson whose order must be updated.
 * @param {'up' | 'down'} move - Direction of the movement : 'up' decreases the order by 1 and 'down' increases it by 1.
 * @param {number} userId - The ID of the user performing the update.
 * 
 * @returns {Promise<ApiResponse>} 
 * Returns `{ success: false }` if the order update is not possible (first or last position)
 * and `{ success: true }` when the order has been successfully updated.
 * 
 * @throws {AppError} If the target lesson is not found with provided ID.
 * @throws {AppError} If lesson to swap is not found in the database.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function changeOrderLessons(lessonId: number, move: 'up' | 'down', userId: number): Promise<ApiResponse> {
  try {
    const targetLesson = await Lesson.findOne({ where: { id: lessonId } });
    if (!targetLesson) throw new AppError(
      404,
      "changeOrderLessons function in lesson service failed : target lesson not found with provided id",
      "La leçon dont vous souhaitez changer l'ordre n'a pas été retrouvée en base de données."
    );

    if(move === 'up') {
      if (targetLesson.order === 1) return { success: false, message: "Le changement d'ordre n'est pas possible car cette leçon est déjà à la première place."};

      const lessonToSwap = await Lesson.findOne({ where: { cursus_id: targetLesson.cursus_id, order: targetLesson.order - 1 } });
      if (!lessonToSwap) throw new AppError(
        404,
        "changeOrderLessons function in lesson service failed : lesson to swap not found",
        "La leçon avec qui il faut échanger l'ordre n'a pas été retrouvée en base de données."
      );

      await lessonToSwap.update({ order: lessonToSwap.order += 1, updatedBy: userId });
      await targetLesson.update({ order: targetLesson.order -= 1, updatedBy: userId });
    } else if (move === 'down') {
      const allLessonsInCursus = await Lesson.findAll({ where: { cursus_id: targetLesson.cursus_id } });
      if (targetLesson.order === allLessonsInCursus.length) return { success: false, message: "Le changement d'ordre n'est pas possible car cette leçon est déjà à la dernière place."};
      
      const lessonToSwap = allLessonsInCursus.find(lesson => lesson.order === targetLesson.order + 1);
      if (!lessonToSwap) throw new AppError(
        404,
        "changeOrderLessons function in lesson service failed : lesson to swap not found",
        "La leçon avec qui il faut échanger l'ordre n'a pas été retrouvée en base de données."
      );

      await lessonToSwap.update({ order: lessonToSwap.order -= 1, updatedBy: userId });
      await targetLesson.update({ order: targetLesson.order += 1, updatedBy: userId });
    }

    return { success: true, message: ''};
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "changeOrderLessons function in lesson service failed",
      "Le changement d'ordre des leçons a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Creates a new lesson after verifying that the name is unique between lessons in the same cursus.
 * 
 * @async
 * @function addLesson
 * 
 * @param {string} lessonName - The name of the lesson to add.
 * @param {string} price - Price of the new lesson.
 * @param {LessonData[]} lessonsInSameCursus - The list of existing lessons (in the same cursus) used to ensure name uniqueness.
 * @param {number} requestorId - The ID of the user who creates the lesson.
 * @param {number} cursusId - The ID of the cursus containing the new lesson. 
 * 
 * @returns {Promise<number>} The ID of the created lesson.
 * 
 * @throws {AppError} If a lesson with the same name already exists.
 * @throws {AppError} If an unexpected error occurs during lesson creation.
 */
export async function addLesson(lessonName: string, price: number, lessonsInSameCursus: LessonData[], requestorId: number, cursusId: number): Promise<number> {
  for (const lesson of lessonsInSameCursus) {
    if (lesson.name === lessonName) throw new AppError(
      422,
      "addLesson function in lesson service failed",
      "Une leçon porte déjà ce nom au sein de ce cursus, veuillez choisir une leçon avec un nom différent.",
    );
  }

  try {
    const newLesson = await Lesson.create({
      name: lessonName,
      cursus_id: cursusId,
      price: price,
      order: lessonsInSameCursus.length + 1,
      createdBy: requestorId,
      updatedBy: null,
    });
    return newLesson.id;
  } catch (error: any) {
    throw new AppError(
      500,
      "addLesson function in lesson service failed",
      "L'ajout d'une nouvelle leçon a échouée, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Deletes a lesson in the database with its ID, image files related to this lesson in this cursus and decreases by one order of the other lessons in the same cursus
 * if they ihgher than the order of the lesson to delete.
 * 
 * @async
 * @function deleteLesson
 * 
 * @param {number} lessonId - ID used to retrieve the lesson to delete.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the lesson to delete is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the lesson deletion.
 */
export async function deleteLesson(lessonId: number): Promise<void> {
  try {
    const lessonToDelete = await Lesson.findByPk(lessonId);
    if (!lessonToDelete) throw new AppError(
      404,
      "deleteLesson function in lesson service failed : lesson not found with provided id",
      "La leçon n'a pas pu être retrouvée avec l'identifiant fourni, veuillez réessayer ultérieurement ou contacter le support.",
    );

    // Delete images files in this lesson
    await deleteImageFiles('lesson', lessonId);

    // Decrease by 1 order of lesson with order greater than order of lesson to delete
    await Lesson.update(
      { order: Sequelize.literal('`order` - 1') },
      { where: { 
          order: { [Op.gt]: lessonToDelete.order },
          cursus_id: lessonToDelete.cursus_id, 
        } 
      }
    );

    const cursusId = lessonToDelete.cursus_id;

    await lessonToDelete.destroy();
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteLesson function in lesson service failed",
      "La suppression de la leçon a échouée, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Update a lesson retrieved by its ID.
 * 
 * @async
 * @function updateLesson
 * 
 * @param {number} lessonId - The ID of the lesson to update.
 * @param {string} newLessonName - The new name of the lesson to update.
 * @param {number} newLessonPrice - The new price of the lesson to update.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If the lesson to update is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function updateLesson(lessonId: number, newLessonName: string, newLessonPrice: number, requestorId: number): Promise<void> {
  try {
    const lessonToUpdate = await Lesson.findByPk(lessonId);
    if(!lessonToUpdate) throw new AppError(
      404,
      "updateLesson function in lesson service failed : lesson not found with provided lesson id",
      "La leçon qui doit être modifiée n'a pas été retrouvée en base de données, veuillez contacter le support.",
    );

    await lessonToUpdate.update({ name: newLessonName, price: newLessonPrice, updatedBy: requestorId });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateLesson function in lesson service failed",
      "La mise à jour de la leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Retrieves the theme/cursus ID of the theme/cursus containing a specific cursus.
 * 
 * @async
 * @function getCursusIdAndThemeIdForThisLesson
 * 
 * @param {number} lessonId - The ID of the lesson used to know which theme/cursus ID is wanted.
 *  
 * @returns {Promise<{ cursusId: number, themeId: number }>} The ID of the theme/cursus containing the cursus. 
 * 
 * @throws {AppError} If lesson is not found with the provided ID.
 * @throws {AppError} If an unexpected error occurs during theme/cursus ID retrieval.
 */
export async function getCursusIdAndThemeIdForThisLesson(lessonId: number): Promise<{ cursusId: number, themeId: number }> {
  try {
    const lesson = await Lesson.findByPk(lessonId, {
      include: [
        {
          model: Cursus,
          as: 'IncludedInCursus',
          include: [
            {
              model: Theme,
              as: 'IncludedInTheme',
            }
          ]
        }
      ]
    });

    if(!lesson) throw new AppError(
      404,
      "getCursusIdAndThemeIdForThisLesson function in lesson service failed : lesson not found with provided id",
      "Leçon non trouvée avec l'identifiant fourni",
    )
    const themeId = lesson.IncludedInCursus.IncludedInTheme.dataValues.id;
    const cursusId = lesson.IncludedInCursus.dataValues.id;
    return { cursusId, themeId };
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getCursusIdAndThemeIdForThisLesson function in lesson service failed",
      "La recherche des identifiants du cursus et du thème de la leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}