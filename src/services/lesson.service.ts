import { Lesson } from "../models/Lesson.js";
import { LessonData } from "../types/Interfaces.js";
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