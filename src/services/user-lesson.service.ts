import { Cursus } from "../models/Cursus.js";
import { Lesson } from "../models/Lesson.js";
import { UserCursus } from "../models/User-Cursus.js";
import { UserLesson } from "../models/User-Lesson.js";
import { UserTheme } from "../models/User-Theme.js";
import { User } from "../models/User.js";
import { LessonData, UserLessonData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { getLesson } from "./lesson.service.js";
import { checkUserCursusValidation } from "./user-cursus.service.js";
import { checkUserThemeCertification } from "./user-theme.service.js";

/**
 * Adds a user-lesson association into the database.
 * 
 * @async
 * @function addUserLesson
 * 
 * @param {number} userId - The ID of the user related to the lesson. 
 * @param {number} lessonId - The ID of the lesson related to the user. 
 * @param {number} requestorId - The ID of the user performing the creation.
 *  
 * @returns {Promise<number | null>} Returns the ID of the cursus containing the lesson if user-lesson creation is a success.
 * Returns null if this user-lesson association already exists in the database.
 * 
 * @throws {AppError} If an unexpected error occurs during user-lesson creation.
 */
export async function addUserLesson(userId: number, lessonId: number, requestorId: number): Promise<number | null> {
  try {
    const userLesson = await UserLesson.findOne({where: { user_id: userId, lesson_id: lessonId }});
    if (userLesson) return null;

    await UserLesson.create({
      user_id: userId,
      lesson_id: lessonId,
      isValidated: false,
      createdBy: requestorId,
    });

    const lesson = await getLesson(lessonId);

    return lesson.cursusId;
  } catch (error: any) {
    throw new AppError(
      500,
      "addUserLesson function in user-lesson service failed",
      "La création de la liaison entre l'utilisateur et la leçon a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

/**
 * Retrieves all user-lesson associations in the database.
 * @async
 * @function getAllUserLessonData
 * 
 * @returns {Promise<UserLessonData[]>} Returns a list of objects containing the user-lesson associations retrieved.
 * 
 * @throws {AppError} If an unexpected error occurs during user-lesson associations retrieval. 
 */
export async function getAllUserLessonData(): Promise<UserLessonData[]> {
  try {
    const allUserLesson = await UserLesson.findAll();
    const allUserLessonData: UserLessonData[] = [];
    for (const userLesson of allUserLesson) {
      const userLessonData: UserLessonData = {
        id: userLesson.id,
        userId: userLesson.user_id,
        lessonId: userLesson.lesson_id,
        isValidated: userLesson.isValidated,
        createdAt: userLesson.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: userLesson.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: userLesson.createdBy,
        updatedBy: userLesson.updatedBy,
      }

      allUserLessonData.push(userLessonData);
    }

    return allUserLessonData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllUserLessonData function in user-lesson service failed",
      "La récupération de l'ensemble des liaisons utilisateur/leçon a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

/**
 * Retrieves all user-lesson associations for a specific user in the database.
 * @async
 * @function getUsersLessonsForThisUser
 * 
 * @param {number} requestorId - The user ID used to retrieve the user-lesson associations.
 * 
 * @returns {Promise<UserLessonData[]>} Returns a list of objects containing the user-lesson associations retrieved for the specified user.
 * 
 * @throws {AppError} If an unexpected error occurs during user-lesson associations retrieval. 
 */
export async function getUsersLessonsForThisUser(requestorId: number): Promise<UserLessonData[]> {
  try {
    const usersLessonsForThisUser = await UserLesson.findAll({ where: { user_id: requestorId } });
    const usersLessonsForThisUserData: UserLessonData[] = [];
    for (const userLesson of usersLessonsForThisUser) {
      const userLessonData: UserLessonData = {
        id: userLesson.id,
        userId: userLesson.user_id,
        lessonId: userLesson.lesson_id,
        isValidated: userLesson.isValidated,
        createdAt: userLesson.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: userLesson.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: userLesson.createdBy,
        updatedBy: userLesson.updatedBy,
      }

      usersLessonsForThisUserData.push(userLessonData);
    }

    return usersLessonsForThisUserData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getUserLessonsForThisUser function in user-lesson service failed",
      "La récupération des liaisons utilisateur/leçon de l'utilisateur a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

/**
 * Retrieves all lessons available for a specific user in the database.
 * 
 * @async
 * @function getAllLessonsAvailable
 * 
 * @param {number} userId - The user ID used to retrieve the lessons.
 * 
 * @returns {Promise<LessonData[]>} Returns a list of lessons retrieved for the specified user.
 * 
 * @throws {AppError} If an unexpected error occurs during lessons retrieval. 
 */
export async function getAllLessonsAvailable(userId: number): Promise<LessonData[]> {
  try {
    const allUserLessons = await UserLesson.findAll({ where: { user_id: userId } });
    let allLessonsAvailable: LessonData[] = [];

    for (const userLesson of allUserLessons) {
      const lessonData = await getLesson(userLesson.lesson_id);
      allLessonsAvailable.push(lessonData);
    }

    return allLessonsAvailable;
  } catch (error) {
   throw new AppError(
    500,
    'getAllLessonsAvailable function in user-lesson service failed',
    "La récupération des leçons disponibles pour cet utilisateur a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
   );
  }
}

/**
 * Updates a user-lesson informations.
 * 
 * @async
 * @function updateUserLesson
 * 
 * @param {number} userLessonId - The user-lesson ID used to retrieve the user-lesson association.
 * @param {boolean} isValidated - The new value of the user-lesson validation property.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {Promise<boolean>} Returns `true` user-lesson validation property is updated.
 * Returns `false` if user-lesson validation property is already equals to isValidated parameter.
 * 
 * @throws {AppError} If the user-lesson association to update is not found whith the user-lesson assocation ID provided.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function updateUserLesson(userLessonId: number, requestorId: number, isValidated: boolean): Promise<boolean> {
  try {
    const userLesson = await UserLesson.findByPk(userLessonId, {
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
      }
    });
    if(!userLesson) throw new AppError(
      404,
      "updateUserLesson function in user-lesson service failed : user-lesson not found with provided userLessonId",
      "La combinaison leçon-utilisateur n'a pas été retrouvée en base de données avec l'identifiant fourni."
    );

    if (userLesson.isValidated === isValidated) return false;

    await userLesson.update({ isValidated: isValidated, updatedBy: requestorId });

    await checkUserCursusValidation(userLesson.RelatedToLesson.dataValues.cursus_id, userLesson.user_id, requestorId);
    
    const cursus = await Cursus.findByPk(userLesson.RelatedToLesson.dataValues.cursus_id);
    if(!cursus) throw new AppError(
      404,
      "updateUserLesson function in user-lesson service failed : cursus not found",
      "Le cursus de la leçon n'a pas été retrouvée en base de données."
    )

    await checkUserThemeCertification(cursus.theme_id, userLesson.user_id, requestorId);

    return true;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateUserLesson function in user-lesson service failed",
      "La mise à jour de l'association utilisateur/leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Deletes a user-lesson. Check if user-cursus related to the user-lesson has still user-lesson under it.
 * If not it deletes the user-cursus, otherwise it checks its isValidated property.
 * If user-cursus is deleted, it checks if user-theme related to the user-cursus has still user-cursus under it.
 * If not it deletes the user-theme, otherwise it checks its isCertified property.
 * 
 * @async
 * @function deleteUserLesson
 * 
 * @param {number} userLessonId - The ID of the user-lesson association to delete. 
 * @param {number} requestorId - The ID of the user performing the deletion.
 * 
 * @returns {Promise{void}}
 * 
 * @throws {AppError} If user-lesson association is not found with the user-lesson ID provided.
 * @throws {AppError} If user-cursus association related to the user-lesson association is not found.
 * @throws {AppError} If user-theme association related to the user-cursus association is not found.
 * @throws {AppError} If an unexpected error occurs during the deletion.
 */
export async function deleteUserLesson(userLessonId: number, requestorId: number): Promise<void> {
  try {
    const userLesson = await UserLesson.findByPk(userLessonId, {
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
      }
    });
    if(!userLesson) throw new AppError(
      404,
      "deleteUserLesson function in user-lesson service failed : user-lesson not found with provided userLessonId",
      "La combinaison leçon-utilisateur n'a pas été retrouvée en base de données avec l'identifiant fourni."
    );

    const userId = userLesson.user_id;
    const cursusId = userLesson.RelatedToLesson.dataValues.cursus_id;

    await userLesson.destroy();

    // Find if there are some user-lesson whose lesson is in this cursus (for this user), if not, we delete user-cursus for this user
    const userLessonsinThisCursus = await UserLesson.findAll({
      where: { user_id: userId },
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
        where: { cursus_id: cursusId },
      }
    });

    const userCursus = await UserCursus.findOne({
      where: {
        user_id: userId,
        cursus_id: cursusId,
      },
      include: {
        model: Cursus,
        as: 'RelatedToCursus',
      },
    });
    if(!userCursus) throw new AppError(
      404,
      "deleteUserLesson function in user-lesson service failed : user-cursus not found",
      "La combinaison cursus-utilisateur (parente de la leçon) n'a pas été retrouvée en base de données."
    );

    const themeId = userCursus.RelatedToCursus.dataValues.theme_id;

    if (userLessonsinThisCursus.length === 0) {
      await userCursus.destroy();

      // Find if there are some user-cursus whose cursus is in this theme (for this user), if not, we delete user-theme for this user
      const userCursusInThisTheme = await UserCursus.findAll({
        where: { user_id: userId },
        include: {
          model: Cursus,
          as: 'RelatedToCursus',
          where: { theme_id: themeId },
        }
      });

      if(userCursusInThisTheme.length === 0) {
        const userTheme = await UserTheme.findOne({ 
          where: {
            user_id: userId,
            theme_id: themeId,
          }
         });
         if(!userTheme) throw new AppError(
          404,
          "deleteUserLesson function in user-lesson service failed : user-theme not found",
          "La combinaison theme-utilisateur (parente de la leçon) n'a pas été retrouvée en base de données."
        );
         
        await userTheme.destroy();
      } else {
        await checkUserThemeCertification(themeId, userId, requestorId);
      }
    } else {
      await checkUserCursusValidation(cursusId, userId, requestorId);
      await checkUserThemeCertification(themeId, userId, requestorId);
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteUserLesson function in user-lesson service failed",
      "La suppression de l'association utilisateur/leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Deletes all user-lesson associations related to a lesson.
 * 
 * @async
 * @function deleteUserLessonForThisLesson
 * 
 * @param {number} lessonId - The ID of the lesson related to all user-lesson associations to delete.
 * @param {number} requestorId  - The ID of the user performing the deletion.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If an expected error occurs during the user-lesson deletions.
 */
export async function deleteUserLessonForThisLesson(lessonId: number, requestorId: number): Promise<void> {
  try {
    const allUserLessonsForThisLesson = await UserLesson.findAll({where: { lesson_id: lessonId }});
    for (const userLesson of allUserLessonsForThisLesson) {
      await deleteUserLesson(userLesson.id, requestorId);
    }
  } catch (error: any) {
    throw new AppError(
      500,
      "deleteUserLessonForThisLesson function in user-lesson service failed",
      "La suppression des associations utilisateur/leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Retrieves the users who have a user-lesson association related to a specific cursus.
 * 
 * @param {number} cursusId - The ID of the cursus used to retrieve the user-lesson associations concerned.
 * 
 * @returns {Promise<User[]>} Returns a list of user.
 * 
 * @throws {AppError} If an unexpected error occurs during users retrieval.
 */
export async function getUsersWhoHaveUserLessonForThisCursus(cursusId: number): Promise<User[]> {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserLesson,
          as :"HasUserLessons",
          required: true,
          include: [
            {
              model: Lesson,
              as: 'RelatedToLesson',
              where: { cursus_id: cursusId },
            }
          ]
        }
      ]
    });
    return users;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getUsersWhoHaveUserLessonForThisCursus function in user-lesson service failed",
      "La recherche des utilisateurs ayant accès à cette leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}