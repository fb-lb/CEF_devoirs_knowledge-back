import Sequelize, { Op } from "sequelize";
import { Lesson } from "../models/Lesson.js";
import { ApiResponse, LessonData } from "../types/Interfaces.js";
import { AppError } from "../utils/AppError.js";
import { deleteImageFiles } from "./element.service.js";

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

export async function getLessonsInCursus(cursusId: number): Promise<LessonData[]> {
  try {
    const lessonsInCursus = await Lesson.findAll({ where: { cursus_id: cursusId } });
    const lessonsInCursusData: LessonData[] = [];
    lessonsInCursus.forEach(lesson => {
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
      lessonsInCursusData.push(lessonData);
    });
    return lessonsInCursusData;
  } catch (error: any) {
    throw new AppError(
      500,
      "getLessonsInCursus function in lesson service failed",
      "La récupération des leçons du cursus a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function getLesson(lessonId: number): Promise<LessonData> {
  try {
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) throw new AppError(
      404,
      'getLesson function in lesson service failed : lesson not found with provided id',
      "La leçon n'a pas été retrouvée avec l'identifiant fourni, veuillez contacter le support pour solutionner le problème au plus vite",
    )

    const lessonData = {
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
    
    return lessonData;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "getLesson function in lesson service failed",
      "La récupération de la leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function changeOrderLessons(lessonId: number, move: 'up' | 'down', userId: number): Promise<ApiResponse> {
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

export async function addLesson(lessonName: string, price: number, lessonsInSameCursus: LessonData[], requestorId: number, cursusId: number): Promise<void> {
  for (const lesson of lessonsInSameCursus) {
    if (lesson.name === lessonName) throw new AppError(
      422,
      "addLesson function in lesson service failed",
      "Une leçon porte déjà ce nom au sein de ce cursus, veuillez choisir une leçon avec un nom différent.",
    );
  }

  try {
    const newLesson = await Lesson.create({
      name: lessonName,
      cursus_id: cursusId,
      price: price,
      order: lessonsInSameCursus.length + 1,
      createdBy: requestorId,
      updatedBy: null,
    });
  } catch (error: any) {
    throw new AppError(
      500,
      "addLesson function in lesson service failed",
      "L'ajout d'une nouvelle leçon a échouée, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function deleteLesson(lessonId: number): Promise<void> {
  try {
    const lessonToDelete = await Lesson.findByPk(lessonId);
    if (!lessonToDelete) throw new AppError(
      404,
      "deleteLesson function in lesson service failed : lesson not found with provided id",
      "La leçon n'a pas pu être retrouvée avec l'identifiant fourni, veuillez réessayer ultérieurement ou contacter le support.",
    );

    // Delete images files in this lesson
    await deleteImageFiles('lesson', lessonId);

    // Decrease by 1 order of lesson with order greater than order of lesson to delete
    await Lesson.update(
      { order: Sequelize.literal('`order` - 1') },
      { where: { 
          order: { [Op.gt]: lessonToDelete.order },
          cursus_id: lessonToDelete.cursus_id, 
        } 
      }
    );

    const cursusId = lessonToDelete.cursus_id;

    await lessonToDelete.destroy();
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "deleteLesson function in lesson service failed",
      "La suppression de la leçon a échouée, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}

export async function updateLesson(lessonId: number, newLessonName: string, newLessonPrice: number, requestorId: number): Promise<void> {
  try {
    const lessonToUpdate = await Lesson.findByPk(lessonId);
    if(!lessonToUpdate) throw new AppError(
      404,
      "updateLesson function in lesson service failed : lesson not found with provided lesson id",
      "La leçon qui doit être modifiée n'a pas été retrouvée en base de données, veuillez contacter le support.",
    );

    await lessonToUpdate.update({ name: newLessonName, price: newLessonPrice, updatedBy: requestorId });
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      "lessonCursus function in lesson service failed",
      "La mise à jour de la leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
      { cause: error }
    );
  }
}