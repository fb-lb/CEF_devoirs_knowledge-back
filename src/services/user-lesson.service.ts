import { UserLesson } from "../models/User-Lesson.js";
import { UserLessonData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { getLesson } from "./lesson.service.js";

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