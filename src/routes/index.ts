import { Router } from 'express';
import { router as regisrationRoute } from './registrationt.js';
import { router as authenticationRoute } from './authentication.js';
import { router as usersRoute } from './users.js';
import { router as themeRoute } from './theme.js';
import { router as cursusRoute } from './cursus.js';
import { router as lessonRoute } from './lesson.js';
import { router as elementRoute } from './element.js';
import { router as stripeRoute } from './stripe.js';
import { router as userCursusRoute } from './user-cursus.js';
import { router as userLessonRoute } from './user-lesson.js';
import { router as userThemeRoute } from './user-theme.js';

export const router: Router = Router();

router.use('/api/inscription', regisrationRoute);
router.use('/api/authentification', authenticationRoute);
router.use('/api/utilisateurs', usersRoute);
router.use('/api/stripe', stripeRoute);

router.use('/api/content/theme', themeRoute);
router.use('/api/content/cursus', cursusRoute);
router.use('/api/content/lesson', lessonRoute);
router.use('/api/content/element', elementRoute);

router.use('/api/user-theme', userThemeRoute)
router.use('/api/user-cursus', userCursusRoute);
router.use('/api/user-lesson', userLessonRoute);