import { Op, where } from "sequelize";
import { Cursus } from "../models/Cursus.js";
import { UserCursus } from "../models/User-Cursus.js";
import { UserTheme } from "../models/User-Theme.js";
import { ThemeData, UserThemeData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { getTheme } from "./theme.service.js";
import { UserLesson } from "../models/User-Lesson.js";
import { Lesson } from "../models/Lesson.js";

export async function addUserTheme(userId: number, themeId: number, requestorId: number): Promise<void> {
  try {
    const userTheme = await UserTheme.findOne({where: { user_id: userId, theme_id: themeId }});
    if (userTheme) return;

    await UserTheme.create({
      user_id: userId,
      theme_id: themeId,
      isCertified: false,
      createdBy: requestorId,
    });
  } catch (error: any) {
    throw new AppError(
      500,
      "addUserTheme function in user-theme service failed",
      "La création de la liaison entre l'utilisateur et le thème a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

export async function getAllUserThemeData(): Promise<UserThemeData[]> {
  try {
    const allUserTheme = await UserTheme.findAll();
    const allUserThemeData: UserThemeData[] = [];
    for (const userTheme of allUserTheme) {
      const userThemeData: UserThemeData = {
        id: userTheme.id,
        userId: userTheme.user_id,
        themeId: userTheme.theme_id,
        isCertified: userTheme.isCertified,
        createdAt: userTheme.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: userTheme.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: userTheme.createdBy,
        updatedBy: userTheme.updatedBy,
      }

      allUserThemeData.push(userThemeData);
    }

    return allUserThemeData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllUserTheme function in user-theme service failed",
      "La récupération de l'ensemble des liaisons utilisateur/thème a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

export async function getUsersThemesForThisUser(requestorId: number): Promise<UserThemeData[]> {
  try {
    const usersThemesForThisUser = await UserTheme.findAll({ where: { user_id: requestorId } });
    const usersThemesForThisUserData: UserThemeData[] = [];
    for (const userTheme of usersThemesForThisUser) {
      const userThemeData: UserThemeData = {
        id: userTheme.id,
        userId: userTheme.user_id,
        themeId: userTheme.theme_id,
        isCertified: userTheme.isCertified,
        createdAt: userTheme.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: userTheme.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: userTheme.createdBy,
        updatedBy: userTheme.updatedBy,
      }

      usersThemesForThisUserData.push(userThemeData);
    }

    return usersThemesForThisUserData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getUsersThemesForThisUser function in user-theme service failed",
      "La récupération des liaisons utilisateur/thème de l'utilisateur a échoué, veuillez essayer ultérieurement.",
      { cause: error },
    );
  }
}

export async function getAllThemesAvailable(userId: number): Promise<ThemeData[]> {
  try {
    const allUserThemes = await UserTheme.findAll({ where: { user_id: userId } });
    let allThemesAvailable: ThemeData[] = [];

    for (const userTheme of allUserThemes) {
      const themeData = await getTheme(userTheme.theme_id);
      allThemesAvailable.push(themeData);
    }

    return allThemesAvailable;
  } catch (error) {
   throw new AppError(
    500,
    'getAllThemesAvailable function in user-theme service failed',
    "La récupération des thèmes disponibles pour cet utilisateur a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
   );
  }
}

export async function checkUserThemeCertification(themeId: number, userId: number, requestorId: number): Promise<void> {
  try {
    const userCursusInThemeForThisUser = await UserCursus.findAll({
          where: { user_id: userId },
          include: {
            model: Cursus,
            as: 'RelatedToCursus',
            where: {theme_id: themeId},
          },
        });
    const userTheme = await UserTheme.findOne({ where: { theme_id: themeId, user_id: userId } });

    if (!userTheme) throw new AppError(
      404,
      "checkUserThemeCertification function in user-theme service failed : user-theme not found with themeId provided",
      "Nous ne retrouvons pas l'association thème-utilisateur en base de données."
    )

    // Check that user has access to all cursus in theme, otherwise he can't have a certification for this theme
    const allCursusInTheme = await Cursus.findAll({ where: { theme_id: themeId } });
    for (const cursus of allCursusInTheme) {
      const userCursus = userCursusInThemeForThisUser.find(userCursus => userCursus.cursus_id === cursus.id);
      if (!userCursus) {
        if(userTheme.isCertified === false) return;
        await userTheme.update({ isCertified: false, updatedBy: requestorId });
        return
      }
    }

    // Check that user has validated all cursus
    for(const userCursus of userCursusInThemeForThisUser) {
      if (!userCursus.isValidated) {
        if(userTheme.isCertified === false) return;
        await userTheme.update({ isCertified: false, updatedBy: requestorId });
        return
      };
    }

    if(userTheme.isCertified !== true) await userTheme.update({ isCertified: true, updatedBy: requestorId });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
    500,
    'checkUserThemeCertification function in user-theme service failed',
    "La vérification de la validation du thème a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

export async function checkUserAccessAllLessonsInTheme(userThemeId: number): Promise<boolean> {
  try {
    const userTheme = await UserTheme.findByPk(userThemeId);
    if (!userTheme) throw new AppError(
      404,
      'checkUserAccessAllLessonsInTheme function in user-theme service failed : user-theme not found with provided id',
      "L'assocation utilisateur/thème n'a pas été retrouvée en base de données avec l'identifiant fourni."
    );

    // Check that user has access to all cursus in the theme
    const allCursusInTheme = await Cursus.findAll({ where: { theme_id: userTheme.theme_id } });
    const allUserCursusForThisThemeAndThisUser = await UserCursus.findAll({
      where: { user_id: userTheme.user_id },
      include: {
        model: Cursus,
        as: 'RelatedToCursus',
        where: { theme_id: userTheme.theme_id },
      }
    });
    const allCursusIdInTheme: number[] = [];
    
    for (const cursus of allCursusInTheme) {
      const userCursus = allUserCursusForThisThemeAndThisUser.find(userCursus => userCursus.cursus_id === cursus.id);
      if (!userCursus) return false;

      allCursusIdInTheme.push(cursus.id);      
    }

    // Check that user has access to all lessons in the theme
    const allLessonsInTheme = await Lesson.findAll({ where: { cursus_id: { [Op.in]: allCursusIdInTheme } } });
    const allUserLessonsForThisThemeAndThisUser = await UserLesson.findAll({
      where: { user_id: userTheme.user_id },
      include: {
        model: Lesson,
        as: 'RelatedToLesson',
        where: { cursus_id: { [Op.in]: allCursusIdInTheme } },
      }
    });

    for (const lesson of allLessonsInTheme) {
      const userLesson = allUserLessonsForThisThemeAndThisUser.find(userLesson => userLesson.lesson_id === lesson.id);
      if (!userLesson) return false;
    }

    return true;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
    500,
    'checkUserAccessAllLessonsInTheme function in user-theme service failed',
    "La vérification de l'accès par l'utilisateur à toutes les leçons du thème a échoué, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

export async function updateUserTheme(userThemeId: number, isCertified: boolean, requestorId: number): Promise<boolean> {
  try {
    const userTheme = await UserTheme.findByPk(userThemeId);
    if (!userTheme) throw new AppError(
      404,
      "updateUserTheme function in user-theme service failed : user-theme not found with provided id",
      "L'association utilisateur/thème n'a pas été retrouvée en base de données avec l'identifiant fourni."
    );
    
    if (userTheme.isCertified === isCertified) return false;

    await userTheme.update({ isCertified: isCertified, updatedBy: requestorId });

    const userCursusForThisThemeAndForThisUser = await UserCursus.findAll({
      where: { user_id: userTheme.user_id },
      include: {
        model: Cursus,
        as: 'RelatedToCursus',
        where: { theme_id: userTheme.theme_id },
      }
    })

    for (const userCursus of userCursusForThisThemeAndForThisUser) {
      await userCursus.update({ isValidated: isCertified, updatedBy: requestorId });

      const userLessonForThisCursusAndForThisUser = await UserLesson.findAll({
        where: { user_id: userTheme.user_id },
        include: {
          model: Lesson,
          as: 'RelatedToLesson',
          where: { cursus_id: userCursus.cursus_id },
        }
      });

      for (const userLesson of userLessonForThisCursusAndForThisUser) {
        await userLesson.update({ isValidated: isCertified, updatedBy: requestorId });
      }
    }

    return true;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
    500,
    'updateUserTheme function in user-theme service failed',
    "La mise à jour de l'association utilisateur/thème a échouée, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

export async function deleteUserTheme(userThemeId: number): Promise<void> {
  try {
    const userTheme = await UserTheme.findByPk(userThemeId);
    if(!userTheme) throw new AppError(
      404,
      "deleteUserTheme function user-theme service failed: no user-theme found with the provided id",
      "L'association utilisateur / thème n'a pas été retrouvée en base de données."
    );

    const userId = userTheme.user_id;
    const themeId = userTheme.theme_id;

    await userTheme.destroy();

    // Find user-cursus which cursus is included in theme of user-theme deleted, for this user
    const allUserCursusInThisThemeForThisUser = await UserCursus.findAll({
      where: { user_id: userId },
      include: {
        model: Cursus,
        as: 'RelatedToCursus',
        where: { theme_id: themeId },
      }
    });

    // For all these user-cursus, find user-lessons (for this user) whose lesson is included in cursus and delete user-lessons
    for(const userCursus of allUserCursusInThisThemeForThisUser) {
      const cursusId = userCursus.cursus_id;
      const allUserLessonsInThisCursusForThisUser = await UserLesson.findAll({
        where: { user_id: userId },
        include: {
          model: Lesson,
          as: 'RelatedToLesson',
          where: { cursus_id: cursusId },
        }
      });

      for(const userLesson of allUserLessonsInThisCursusForThisUser) {
        await userLesson.destroy();
      }
    }

    // Now delete the user-cursus
    for(const userCursus of allUserCursusInThisThemeForThisUser) {
      await userCursus.destroy();
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
    500,
    'deleteUserTheme function in user-theme service failed',
    "La suppression de l'association utilisateur/thème a échouée, veuillez contacter le support pour solutionner le problème au plus vite.",
    { cause: error },
   );
  }
}

export async function deleteUserThemeForThisTheme(themeId: number): Promise<void> {
  try {
    const allUserThemeForThisTheme = await UserTheme.findAll({where: { theme_id: themeId }});
    for (const userTheme of allUserThemeForThisTheme) {
      await deleteUserTheme(userTheme.id);
    }
  } catch (error: any) {
    throw new AppError(
      500,
      "deleteUserThemeForThisTheme function in user-theme service failed",
      "La suppression des associations utilisateur/thème a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}