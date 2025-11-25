import { Cursus } from "../models/Cursus.js";
import { Lesson } from "../models/Lesson.js";
import { UserCursus } from "../models/User-Cursus.js";
import { UserLesson } from "../models/User-Lesson.js";
import { UserTheme } from "../models/User-Theme.js";
import { User } from "../models/User.js";
import { CursusData, UserCursusData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { getCursus } from "./cursus.service.js";
import { checkUserThemeCertification } from "./user-theme.service.js";

/**
 * Adds a user-cursus association into the database.
 * 
 * @async
 * @function addUserCursus
 * 
 * @param {number} userId - The ID of the user related to the cursus. 
 * @param {number} cursusId - The ID of the cursus related to the user. 
 * @param {number} requestorId - The ID of the user performing the creation.
 *  
 * @returns {Promise<number | null>} Returns the ID of the theme containing the cursus if user-cursus creation is a success.
 * Returns null if this user-cursus association already exists in the database.
 * 
 * @throws {AppError} If an unexpected error occurs during user-cursus creation.
 */
export async function addUserCursus(userId: number, cursusId: number, requestorId: number): Promise<number | null> {
  try {
    const userCursus = await UserCursus.findOne({where: { user_id: userId, cursus_id: cursusId }});
    if (userCursus) return null;

    await UserCursus.create({
      user_id: userId,
      cursus_id: cursusId,
      isValidated: false,
      createdBy: requestorId,
    });

    const cursus = await getCursus(cursusId);

    return cursus.themeId;
  } catch (error: any) {
    throw new AppError(
      500,
      "addUserCursus function in user-cursus service failed",
      "La création de la liaison entre l'utilisateur et le cursus a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

/**
 * Retrieves all user-cursus associations in the database.
 * @async
 * @function getAllUserCursusData
 * 
 * @returns {Promise<UserCursusData[]>} Returns a list of objects containing the user-cursus associations retrieved.
 * 
 * @throws {AppError} If an unexpected error occurs during user-cursus associations retrieval. 
 */
export async function getAllUserCursusData(): Promise<UserCursusData[]> {
  try {
    const allUserCursus = await UserCursus.findAll();
    const allUserCursusData: UserCursusData[] = [];
    for (const userCursus of allUserCursus) {
      const userCursusData: UserCursusData = {
        id: userCursus.id,
        userId: userCursus.user_id,
        cursusId: userCursus.cursus_id,
        isValidated: userCursus.isValidated,
        createdAt: userCursus.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: userCursus.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: userCursus.createdBy,
        updatedBy: userCursus.updatedBy,
      }

      allUserCursusData.push(userCursusData);
    }

    return allUserCursusData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllUserCursus function in user-cursus service failed",
      "La récupération de l'ensemble des liaisons utilisateur/cursus a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

/**
 * Retrieves all user-cursus associations for a specific user in the database.
 * @async
 * @function getUsersCursusForThisUser
 * 
 * @param {number} requestorId - The user ID used to retrieve the user-cursus associations.
 * 
 * @returns {Promise<UserCursusData[]>} Returns a list of objects containing the user-cursus associations retrieved for the specified user.
 * 
 * @throws {AppError} If an unexpected error occurs during user-cursus associations retrieval. 
 */
export async function getUsersCursusForThisUser(requestorId: number): Promise<UserCursusData[]> {
  try {
    const usersCursusForThisUser = await UserCursus.findAll({ where: { user_id: requestorId } });
    const usersCursusForThisUserData: UserCursusData[] = [];
    for (const userCursus of usersCursusForThisUser) {
      const userCursusData: UserCursusData = {
        id: userCursus.id,
        userId: userCursus.user_id,
        cursusId: userCursus.cursus_id,
        isValidated: userCursus.isValidated,
        createdAt: userCursus.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: userCursus.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: userCursus.createdBy,
        updatedBy: userCursus.updatedBy,
      }

      usersCursusForThisUserData.push(userCursusData);
    }

    return usersCursusForThisUserData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getUserCursusForThisUser function in user-cursus service failed",
      "La récupération des liaisons utilisateur/cursus de l'utilisateur a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

/**
 * Retrieves all cursus available for a specific user in the database.
 * 
 * @async
 * @function getAllCursusAvailable
 * 
 * @param {number} userId - The user ID used to retrieve the cursus.
 * 
 * @returns {Promise<CursusData[]>} Returns a list of cursus retrieved for the specified user.
 * 
 * @throws {AppError} If an unexpected error occurs during cursus retrieval. 
 */
export async function getAllCursusAvailable(userId: number): Promise<CursusData[]> {
  try {
    const allUserCursus = await UserCursus.findAll({ where: { user_id: userId } });
    let allCursusAvailable: CursusData[] = [];

    for (const userCursus of allUserCursus) {
      const cursusData = await getCursus(userCursus.cursus_id);
      allCursusAvailable.push(cursusData);
    }

    return allCursusAvailable;
  } catch (error: any) {
   throw new AppError(
    500,
    'getAllCursusAvailable function in user-cursus service failed',
    "La récupération des cursus disponibles pour cet utilisateur a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

/**
 * Updates user-cursus validation. First, it checks if a user has access to all lessons in the cursus concerned.
 * If not user-cursus validation is updated false but if true, it checks if all user-lessons related to this cursus are validated.
 * If not user-cursus validation is updated false but if true, user-cursus validation is updated true.
 * 
 * @async
 * @function checkUserCursusValidation
 * 
 * @param {number} cursusId - The ID of the cursus related to user-cursus association to check.
 * @param {number} userId - The ID of the user related to user-cursus association to check.
 * @param {number} requestorId - The ID of the user performing this update.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If user-cursus assocation is not retrieved width cursus ID and user ID provided.
 * @throws {AppError} If an unexpected error occurs during the checking.
 */
export async function checkUserCursusValidation(cursusId: number, userId: number, requestorId: number): Promise<void> {
  try {
    const userLessonsInCursusForThisUser = await UserLesson.findAll({
      where: { user_id: userId },
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
        where: {cursus_id: cursusId},
      },
    });

    const userCursus = await UserCursus.findOne({ where: { cursus_id: cursusId, user_id: userId } });

    if (!userCursus) throw new AppError(
      404,
      "checkUserCursusValidation function in user-cursus service failed : user-cursus not found with cursusId provided",
      "Nous ne retrouvons pas l'association cursus-utilisateur en base de données."
    )

    // Check that user has access to all lessons in cursus, otherwise he can't validate the cursus
    const allLessonsInCursus = await Lesson.findAll({ where: { cursus_id: cursusId } });
    for (const lesson of allLessonsInCursus) {
      const userLesson = userLessonsInCursusForThisUser.find(userLesson => userLesson.lesson_id === lesson.id);
      if (!userLesson) {
        if (userCursus.isValidated === false) return;
        await userCursus.update({ isValidated: false, updatedBy: requestorId });
        return
      }
    }

    // Check that each lesson in cursus is validated, otherwise cursus is not validated
    for(const userLesson of userLessonsInCursusForThisUser) {
      if (!userLesson.isValidated) {
        if (userCursus.isValidated === false) return;
        await userCursus.update({ isValidated: false, updatedBy: requestorId });
        return
      };
    }

    if(userCursus.isValidated !== true) await userCursus.update({ isValidated: true, updatedBy: requestorId });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
    500,
    'checkUserCursusValidation function in user-cursus service failed',
    "La vérification de la validation du cursus a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

/**
 * Checks if a user has access to all lessons in a cursus.
 * 
 * @async
 * @function checkUserAccessAllLessonsInCursus
 * 
 * @param {number} userCursusId - The user-cursus association ID used to retrieve the cursus to check.
 * 
 * @returns {Promise<boolean>} Returns `true` if the user of the user-cursus association has access to all lessons in th cursus related
 * to the user-cursus association. Otherwise, it returns `false`.
 * 
 * @throws {AppError} If user-cursus association is not retrieved width cursus ID and user ID provided.
 * @throws {AppError} If an unexpected error occurs during the checking.
 */
export async function checkUserAccessAllLessonsInCursus(userCursusId: number): Promise<boolean> {
  try {
    const userCursus = await UserCursus.findByPk(userCursusId);
    if (!userCursus) throw new AppError(
      404,
      'checkUserAccessAllLessonsInCursus function in user-cursus service failed : user-cursus not found with provided id',
      "L'assocation utilisateur/cursus n'a pas été retrouvée en base de données avec l'identifiant fourni."
    );

    // Check that user has access to all lessons in the cursus
    const allLessonsInCursus = await Lesson.findAll({ where: { cursus_id: userCursus.cursus_id } });
    const allUserLessonsForThisCursusAndThisUser = await UserLesson.findAll({
      where: { user_id: userCursus.user_id },
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
        where: { cursus_id: userCursus.cursus_id },
      }
    });

    for (const lesson of allLessonsInCursus) {
      const userLesson = allUserLessonsForThisCursusAndThisUser.find(userLesson => userLesson.lesson_id === lesson.id);
      if (!userLesson) return false;
    }

    return true;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
    500,
    'checkUserAccessAllLessonsInCursus function in user-cursus service failed',
    "La vérification de l'accès par l'utilisateur à toutes les leçons du cursus a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

/**
 * Updates a user-cursus informations.
 * 
 * @async
 * @function updateUserCursus
 * 
 * @param {number} userCursusId - The user-cursus ID used to retrieve the user-cursus association.
 * @param {boolean} isValidated - The new value of the user-cursus validation property.
 * @param {number} requestorId - The ID of the user performing the update.
 * 
 * @returns {Promise<boolean>} Returns `true` user-cursus validation property is updated.
 * Returns `false` if user-cursus validation property is already equals to isValidated parameter.
 * 
 * @throws {AppError} If the user-cursus association to update is not found whith the user-cursus assocation ID provided.
 * @throws {AppError} If an unexpected error occurs during the update.
 */
export async function updateUserCursus(userCursusId: number, isValidated: boolean, requestorId: number): Promise<boolean> {
  try {
    const userCursus = await UserCursus.findByPk(userCursusId, {
      include: {
        model: Cursus,
        as:'RelatedToCursus',
      }
    });
    if (!userCursus) throw new AppError(
      404,
      "updateUserTupdateUserCursusheme function in user-cursus service failed : user-cursus not found with provided id",
      "L'association utilisateur/cursus n'a pas été retrouvée en base de données avec l'identifiant fourni."
    );

    if (userCursus.isValidated === isValidated) return false;
    
    await userCursus.update({ isValidated: isValidated, updatedBy: requestorId });

    const userLessonsForThisCursusAndForThisUser = await UserLesson.findAll({
      where: { user_id: userCursus.user_id },
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
        where: { cursus_id: userCursus.cursus_id },
      }
    });

    for (const userLesson of userLessonsForThisCursusAndForThisUser) {
      if(userLesson.isValidated !== isValidated) await userLesson.update({ isValidated: isValidated, updatedBy: requestorId });
    }

    await checkUserThemeCertification(userCursus.RelatedToCursus.dataValues.theme_id, userCursus.user_id, requestorId);

    return true;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
    500,
    'updateUserCursus function in user-cursus service failed',
    "La mise à jour de l'association utilisateur/cursus a échouée, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

/**
 * Deletes a user-cursus and related user-lessons. Check if user-theme related to the user-cursus has still user-cursus under it.
 * If not it deletes the user-theme, otherwise it checks its isCertified property.
 * 
 * @async
 * @function deleteUserCursus
 * 
 * @param {number} userCursusId - The ID of the user-cursus association to delete. 
 * @param {number} requestorId - The ID of the user performing the deletion.
 * 
 * @returns {Promise{void}}
 * 
 * @throws {AppError} If user-cursus association is not found with the user-cursus ID provided.
 * @throws {AppError} If user-theme association related to the user-cursus association is not found.
 * @throws {AppError} If an unexpected error occurs during the deletion.
 */
export async function deleteUserCursus(userCursusId: number, requestorId: number): Promise<void> {
  try {
    // Find user-cursus and delete it
    const userCursus = await UserCursus.findByPk(userCursusId, {
      include: {
        model: Cursus,
        as: 'RelatedToCursus',
      }
    });
    if(!userCursus) throw new AppError(
      404,
      "deleteUserCursus function in user-cursus service failed : user-cursus not found with provided userCursusId",
      "La combinaison cursus-utilisateur n'a pas été retrouvée en base de données avec l'identifiant fourni."
    );

    const userId = userCursus.user_id;
    const cursusId = userCursus.cursus_id;
    const themeId = userCursus.RelatedToCursus.dataValues.theme_id;

    await userCursus.destroy();

    // Find all user-lesson whose lesson is in this cursus (for this user) and delete them
    const userLessonsForThisCursus = await UserLesson.findAll({
      where: { user_id: userId },
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
        where: { cursus_id: cursusId }
      }
    });

    for (const userLesson of userLessonsForThisCursus) {
      await userLesson.destroy();
    }
    
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
        "deleteUserCursus function in user-cursus service failed : user-theme not found",
        "La combinaison theme-utilisateur (parente de la leçon) n'a pas été retrouvée en base de données."
      );
        
      await userTheme.destroy();
    } else {
      await checkUserThemeCertification(themeId, userId, requestorId);
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteUserCursus function in user-cursus service failed",
      "La suppression de l'association utilisateur/leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Deletes all user-cursus associations related to a cursus.
 * 
 * @async
 * @function deleteUserCursusForThisCursus
 * 
 * @param {number} cursusId - The ID of the cursus related to all user-cursus associations to delete.
 * @param {number} requestorId  - The ID of the user performing the deletion.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {AppError} If an expected error occurs during the user-cursus deletions.
 */
export async function deleteUserCursusForThisCursus(cursusId: number, requestorId: number): Promise<void> {
  try {
    const allUserCursusForThisCursus = await UserCursus.findAll({where: { cursus_id: cursusId }});
    for (const userCursus of allUserCursusForThisCursus) {
      await deleteUserCursus(userCursus.id, requestorId);
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteUserCursusForThisCursus function in user-cursus service failed",
      "La suppression des associations utilisateur/cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

/**
 * Retrieves the users who have a user-cursus association related to a specific theme.
 * 
 * @param {number} themeId - The ID of the theme used to retrieve the user-cursus associations concerned.
 * 
 * @returns {Promise<User[]>} Returns a list of user.
 * 
 * @throws {AppError} If an unexpected error occurs during users retrieval.
 */
export async function getUsersWhoHaveUserCursusForThisTheme(themeId: number): Promise<User[]> {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserCursus,
          as :"HasUserCursus",
          required: true,
          include :[
            {
              model: Cursus,
              as: 'RelatedToCursus',
              where: { theme_id: themeId },
            }
          ]
        }
      ]
    });
    return users;
  } catch (error: any) {
    throw new AppError(
      500,
      "getUsersWhoHaveUserCursusForThisTheme function in user-cursus service failed",
      "La recherche des utilisateurs ayant accès à ce cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}