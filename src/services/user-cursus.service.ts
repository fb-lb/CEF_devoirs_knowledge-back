import { UserCursus } from "../models/User-Cursus.js";
import { UserCursusData } from "../types/Interfaces.js";
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