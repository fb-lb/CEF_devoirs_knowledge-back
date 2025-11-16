import { Cursus } from "../models/Cursus.js";
import { Lesson } from "../models/Lesson.js";
import { Theme } from "../models/Theme.js";
import { UserCursus } from "../models/User-Cursus.js";
import { UserLesson } from "../models/User-Lesson.js";
import { UserTheme } from "../models/User-Theme.js";
import { User } from "../models/User.js";
import { LessonData, UserLessonData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { getLesson } from "./lesson.service.js";
import { checkUserCursusValidation } from "./user-cursus.service.js";
import { checkUserThemeCertification } from "./user-theme.service.js";

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