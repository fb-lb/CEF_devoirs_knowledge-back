import { UserTheme } from "../models/User-Theme.js";
import { AppError } from "../utils/AppError.js";

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