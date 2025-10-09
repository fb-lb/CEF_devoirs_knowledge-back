import { Lesson } from "../models/Lesson.js";
import { ApiResponse, LessonData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";

export async function getAllLessons(): Promise<LessonData[]> {
  try {
    const allLessons = await Lesson.findAll();
    const allLessonsData: LessonData[] = [];
    allLessons.forEach(lesson => {
      const lessonData: LessonData = {
        id: lesson.id,
        cursusId: lesson.cursus_id,
        name: lesson.name,
        price: lesson.price,
        order: lesson.order,
        createdAt: lesson.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        updatedAt: lesson.updatedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        createdBy: lesson.createdBy,
        updatedBy: lesson.updatedBy,
      };
      allLessonsData.push(lessonData);
    })
    return allLessonsData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getAllLessons function in lesson service failed",
      "La récupération des leçons a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function  changeOrderLessons(lessonId: number, move: 'up' | 'down', userId: number): Promise<ApiResponse> {
  try {
    const targetLesson = await Lesson.findOne({ where: { id: lessonId } });
    if (!targetLesson) throw new AppError(
      404,
      "changeOrderLessons function in lesson service failed : target lesson not found with provided id",
      "La leçon dont vous souhaitez changer l'ordre n'a pas été retrouvée en base de données."
    );

    if(move === 'up') {
      if (targetLesson.order === 1) return { success: false, message: "Le changement d'ordre n'est pas possible car cette leçon est déjà à la première place."};

      const lessonToSwap = await Lesson.findOne({ where: { cursus_id: targetLesson.cursus_id, order: targetLesson.order - 1 } });
      if (!lessonToSwap) throw new AppError(
        404,
        "changeOrderLessons function in lesson service failed : lesson to swap not found",
        "La leçon avec qui il faut échanger l'ordre n'a pas été retrouvée en base de données."
      );

      await lessonToSwap.update({ order: lessonToSwap.order += 1, updatedBy: userId });
      await targetLesson.update({ order: targetLesson.order -= 1, updatedBy: userId });
    } else if (move === 'down') {
      const allLessonsInCursus = await Lesson.findAll({ where: { cursus_id: targetLesson.cursus_id } });
      if (targetLesson.order === allLessonsInCursus.length) return { success: false, message: "Le changement d'ordre n'est pas possible car cette leçon est déjà à la dernière place."};
      
      const lessonToSwap = allLessonsInCursus.find(lesson => lesson.order === targetLesson.order + 1);
      if (!lessonToSwap) throw new AppError(
        404,
        "changeOrderLessons function in lesson service failed : lesson to swap not found",
        "La leçon avec qui il faut échanger l'ordre n'a pas été retrouvée en base de données."
      );

      await lessonToSwap.update({ order: lessonToSwap.order -= 1, updatedBy: userId });
      await targetLesson.update({ order: targetLesson.order += 1, updatedBy: userId });
    }

    return { success: true, message: ''};
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "changeOrderLessons function in lesson service failed",
      "Le changement d'ordre des leçons a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}