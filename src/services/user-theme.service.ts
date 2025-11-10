import { Cursus } from "../models/Cursus.js";
import { UserCursus } from "../models/User-Cursus.js";
import { UserTheme } from "../models/User-Theme.js";
import { ThemeData, UserThemeData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { getTheme } from "./theme.service.js";

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

export async function checkUserThemeCertification(themeId: number, userId: number): Promise<void> {
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

    for(const userCursus of userCursusInThemeForThisUser) {
      if (!userCursus.isValidated) {
        await userTheme.update({ isCertified: false });
        return
      };
    }

    await userTheme.update({ isCertified: true });
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