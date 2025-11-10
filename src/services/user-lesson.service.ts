import { Cursus } from "../models/Cursus.js";
import { Lesson } from "../models/Lesson.js";
import { UserLesson } from "../models/User-Lesson.js";
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

export async function updateUserLessonValidation(lessonId: number, userId: number, isValidated: boolean): Promise<void> {
  try {
    const userLesson = await UserLesson.findOne({where: {lesson_id: lessonId, user_id: userId}});
    if(!userLesson) throw new AppError(
      404,
      "updateUserLessonValidation function in user-lesson service failed : user-lesson not found with provided lessonId and userId",
      "La combinaison leçon-utilisateur n'a pas été retrouvée en base de données avec les identifiants fournis."
    )

    const lesson = await Lesson.findByPk(lessonId);
    if(!lesson) throw new AppError(
      404,
      "updateUserLessonValidation function in user-lesson service failed : lesson not found with provided lessonId",
      "La leçon n'a pas été retrouvée en base de données avec l'identifiant fourni."
    )

    await userLesson.update({ isValidated: isValidated });

    const isCursusValidated = await checkUserCursusValidation(lesson.cursus_id, userId);
    if(isCursusValidated) {
      const cursus = await Cursus.findByPk(lesson.cursus_id);
      if(!cursus) throw new AppError(
        404,
        "updateUserLessonValidation function in user-lesson service failed : cursus not found with lesson.cursus_id in lesson",
        "Le cursus de la leçon n'a pas été retrouvée en base de données."
      )

      await checkUserThemeCertification(cursus.theme_id, userId);
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "updateUserLessonValidation function in user-lesson service failed",
      "La mise à jour de la validation de la leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}