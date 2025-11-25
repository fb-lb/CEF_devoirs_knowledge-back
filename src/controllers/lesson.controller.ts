import { Request, Response } from 'express';
import { ApiResponse, LessonData } from "../types/Interfaces.js";
import { addLesson, changeOrderLessons, deleteLesson, getAllLessons, getCursusIdAndThemeIdForThisLesson, updateLesson } from '../services/lesson.service.js';
import { AppError } from '../utils/AppError.js';
import { getUserIdInRequest } from '../services/user.service.js';
import { validateAddLessonForm, validateUpdateLessonForm } from '../services/form.service.js';
import { getRequestorId } from '../services/token.service.js';
import { deleteUserLessonForThisLesson, getUsersWhoHaveUserLessonForThisCursus } from '../services/user-lesson.service.js';
import { checkUserCursusValidation } from '../services/user-cursus.service.js';
import { checkUserThemeCertification } from '../services/user-theme.service.js';

/**
 * Handle all lessons retrieval.
 *
 * @route GET /api/content/lesson/all
 * @param {Request} req - Express request.
 * @param {Response} res - Express response containing all lesson informations.
 * 
 * @returns {Promise<Response<ApiResponse<LessonData[]>>>} Returns:
 * - 200 with a list of objects containing lesson informations in data property.
 *
 * @description
 * Steps:
 * - Retrieves all lesson informations.
 */
export async function getAllLessonsController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
  const allLessons: LessonData[] = await getAllLessons();
  return res.status(200).json({
    success: true,
    message: '',
    data: allLessons,
  });
}

/**
 * Handle lesson order update.
 *
 * @route GET /api/content/lesson/:id/:move
 * @param {Request} req - Express request containing the ID of the lesson to move and the movement ('up' | 'down') in URL parameters.
 * @param {Response} res - Express response containing the informations of all the lessons.
 * 
 * @returns {Promise<Response<ApiResponse<LessonData[] | any>>>} Returns:
 * - 200 with an object containing all the lesson informations in data property.
 * - 400 if movement is 'up' and lesson is at first position or if movement is 'down' with lesson at the last position.
 *
 * @description
 * Steps:
 * - Checks that lesson ID is provided in URL params,
 * - Checks that move is provided in URL params and equals to 'up' | 'down',
 * - Change the order of the target lesson,
 * - Get all lesson informations.
 * 
 * @throws {AppError} If no id provided in URL params.
 * @throws {AppError} If move in URL param is not provided or different from 'up' | 'down'.
 */
export async function changeOrderLessonsController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[] | any>>> {
  if (!req.params.id) throw new AppError(
    400,
    'changeOrderLessonsController function in lesson controller failed : no id provided in url params',
    "Nous ne pouvons changer l'ordre des leçons, car l'identifiant de la leçon n'est pas fourni."
  )
  if (!req.params.move || (req.params.move !== 'up' && req.params.move !== 'down')) throw new AppError(
    400,
    'changeOrderLessonsController function in lesson controller failed : no move provided in url params',
    "Nous ne pouvons changer l'ordre des leçons, car le changement d'ordre (up ou down) de la leçon n'est pas fourni ou est mal défini."
  )
  
  const userId = getUserIdInRequest(req);
  const lessonId = parseInt(req.params.id);
  const response = await changeOrderLessons(lessonId, req.params.move, userId);
  if (!response.success) return res.status(400).json({ success: false, message: response.message });

  const allLessons: LessonData[] = await getAllLessons();
  return res.status(200).json({
    success: true,
    message: '',
    data: allLessons,
  });
}

/**
 * Handle lesson creation.
 *
 * @route POST /api/content/lesson/add
 * @param {Request} req - Express request containing the lesson informations in the body.
 * @param {Response} res - Express response containing the informations of all the lessons.
 * 
 * @returns {Promise<Response<ApiResponse<LessonData[]>>>} Returns:
 * - 200 with an object containing all the lesson informations in data property.
 *
 * @description
 * Steps:
 * - Validates the lesson informations,
 * - Gets the requestor ID,
 * - Creates the new lesson,
 * - Get all lesson informations,
 * - Updates cursus validation and theme certification for users who have access to this lesson.
 */
export async function addLessonController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
  const lessonName: string = req.body.name;
  const cursusIdForThisLesson: number = req.body.cursusId;
  const price: number = req.body.price;
  validateAddLessonForm(lessonName, cursusIdForThisLesson, price);

  const requestorId = getRequestorId(req.cookies.token);

  let allLessons = await getAllLessons();
  let selectedLessons: LessonData[] = [];
  for (const lesson of allLessons) {
    if (lesson.cursusId === cursusIdForThisLesson) selectedLessons.push(lesson);
  }
  
  const lessonId = await addLesson(lessonName, price, selectedLessons, requestorId, cursusIdForThisLesson);

  // Check cursus validation and theme certification for users who have access to this lesson
  const { themeId, cursusId } = await getCursusIdAndThemeIdForThisLesson(lessonId);
  const users = await getUsersWhoHaveUserLessonForThisCursus(cursusId);
  for(const user of users) {
    await checkUserCursusValidation(cursusId, user.id, requestorId);
    await checkUserThemeCertification(themeId, user.id, requestorId);
  }

  allLessons = await getAllLessons();

  return res.status(200).json({
    success: true,
    message: `La leçon ${lessonName} a bien été ajoutée`,
    data: allLessons,
  });
}

/**
 * Handle lesson deletion.
 *
 * @route DELETE /api/content/lesson/:id
 * @param {Request} req - Express request containing the ID of the lesson to delete in URL parameter.
 * @param {Response} res - Express response containing the informations of all the lessons.
 * 
 * @returns {Promise<Response<ApiResponse<LessonData[]>>>} Returns:
 * - 200 with an object containing all the lesson informations in data property.
 *
 * @description
 * Steps:
 * - Gets the ID of the theme containing the cursus which contains the lesson,
 * - Gets the ID of the cursus containing the lesson,
 * - Gets a list of users who have user-lesson associations related to this cursus,
 * - Deletes the user-lessons related to the lesson to delete,
 * - Deletes the target lesson,
 * - Updates users' validation for the cursus containing this lesson,
 * - Updates users' certification for the theme containing this cursus,
 * - Get all lesson informations.
 * 
 * @throws {AppError} If cursus ID URL parameter is not provided.
 */
export async function deleteLessonController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
    if(!req.params.id) throw new AppError(
    422,
    'deleteLessonController function in lesson controller failed : no id provided in url parameter',
    "La leçon n'a pas pu être retrouvée car son identifiant n'est pas fourni, veuillez contacter le support pour solutionner le problème au plus vite."
  );

  const requestorId = getRequestorId(req.cookies.token);
  const lessonId = parseInt(req.params.id);
  
  const { cursusId, themeId } = await getCursusIdAndThemeIdForThisLesson(lessonId);
  const usersWhoHaveUserLessonForThisCursus = await getUsersWhoHaveUserLessonForThisCursus(cursusId);

  await deleteUserLessonForThisLesson(lessonId, requestorId);
  
  await deleteLesson(lessonId);

  for(const user of usersWhoHaveUserLessonForThisCursus) {
    await checkUserCursusValidation(cursusId, user.id, requestorId);
    await checkUserThemeCertification(themeId, user.id, requestorId);
  }
  
  const allLessons = await getAllLessons();
  return res.status(200).json({
    success: true,
    message: 'La leçon a bien été supprimée.',
    data: allLessons,
  });
}

/**
 * Handle lesson update.
 *
 * @route PATCH /api/content/lesson/:id
 * @param {Request} req - Express request containing the ID of the lesson to update in URL parameter.
 * @param {Response} res - Express response containing the informations of all the lessons.
 * 
 * @returns {Promise<Response<ApiResponse<LessonData[]>>>} Returns:
 * - 200 with an object containing all the lesson informations in data property.
 *
 * @description
 * Steps:
 * - Validates the lesson informations,
 * - Updates the target lesson,
 * - Get all lesson informations.
 * 
 * @throws {AppError} If lesson ID URL parameter is not provided.
 */
export async function updateLessonController(req: Request, res: Response): Promise<Response<ApiResponse<LessonData[]>>> {
  if(!req.params.id) throw new AppError(
    422,
    'updateLessonController function in lesson controller failed : no lesson id provided in url paramater',
    "L'identifiant de la leçon n'a pas été fourni avec le formulaire, veuillez contacter le support pour solutionner le problème au plus vite.",
  );

  const lessonId = Number(req.params.id);

  const newLessonName: string = req.body.name;
  const newLessonPrice: number = Number(req.body.price);
  validateUpdateLessonForm(newLessonName, newLessonPrice);

  const requestorId = getRequestorId(req.cookies.token);

  await updateLesson(lessonId, newLessonName, newLessonPrice, requestorId);

  const allLessons = await getAllLessons();

  return res.status(200).json({
    success: true,
    message: 'La leçon a bien été mise à jour.',
    data: allLessons,
  });
}