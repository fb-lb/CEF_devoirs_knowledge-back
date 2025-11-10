import { Lesson } from "../models/Lesson.js";
import { UserCursus } from "../models/User-Cursus.js";
import { UserLesson } from "../models/User-Lesson.js";
import { CursusData, UserCursusData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { getCursus } from "./cursus.service.js";

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

export async function checkUserCursusValidation(cursusId: number, userId: number): Promise<boolean> {
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

    for(const userLesson of userLessonsInCursusForThisUser) {
      if (!userLesson.isValidated) {
        await userCursus.update({ isValidated: false });
        return false
      };
    }

    await userCursus.update({ isValidated: true });

    return true;
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