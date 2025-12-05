import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Lesson } from "../models/Lesson.js";
import { getLesson } from "../services/lesson.service.js";

describe('Lesson service - getLesson', () => {
  let lessonId: number;
  let lesson: Partial<Lesson>;
  let findByPkLessonMock: Mock;

  beforeEach(() => {
    lessonId = 1;
    lesson = {
      id: 1,
      cursus_id: 1,
      name: 'Introduction',
      price: 10,
      order: 1,
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-01T10:00:00.000Z'),
      createdBy: 1,
      updatedBy: null,
    };

    findByPkLessonMock = vi.spyOn(Lesson, 'findByPk');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return lesson data of successfull retrieved lesson', async () => {
    findByPkLessonMock.mockResolvedValue(lesson);

    const lessonDataResponse = await getLesson(lessonId);

    expect(findByPkLessonMock).toHaveBeenCalledWith(lessonId);
    expect(Object.keys(lessonDataResponse)).toEqual([
      "id",
      "cursusId",
      "name",
      "price",
      "order",
      "createdAt",
      "updatedAt",
      "createdBy",
      "updatedBy",
    ]);
  });

  it('should return an AppError because lesson is not found', async () => {
    findByPkLessonMock.mockResolvedValue(null);

    await expect(getLesson(lessonId)).rejects.toMatchObject({
      status: 404,
      message: 'getLesson function in lesson service failed : lesson not found with provided id',
      messageFront: "La leçon n'a pas été retrouvée avec l'identifiant fourni, veuillez contacter le support pour solutionner le problème au plus vite",
    });

    expect(findByPkLessonMock).toHaveBeenCalledWith(lessonId);
  });

  it('should return an AppError because an unexpected error occurs', async () => {
    findByPkLessonMock.mockRejectedValue(new Error());

    await expect(getLesson(lessonId)).rejects.toMatchObject({
      status: 500,
      message: 'getLesson function in lesson service failed',
      messageFront: "La récupération de la leçon a échoué, veuillez réessayer ultérieurement ou contacter le support.",
    });

    expect(findByPkLessonMock).toHaveBeenCalledWith(lessonId);
  });
});