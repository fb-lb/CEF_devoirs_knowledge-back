import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { Sequelize } from 'sequelize';

import { router as indexRouter } from './routes/index.js';
import { router as usersRouter } from './routes/users.js';

// Get public folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------
// Initiate connection to the database
// ------------------------------------

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,
})

// Connection test
try {
    await sequelize.authenticate();
    console.log('Connected to the database.');
} catch (error) {
    console.error('Connection to the database failed : ', error);
}

// -----------------------
// Express configuration
// -----------------------
const app = express();

// Authorize front-end url to make request to the back-end
app.use(cors({
    origin: process.env.FRONT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 error management
app.use(function(req, res, next) {
    res.status(404).json({
        error: 'Not found',
        message: `La route ${req.originalUrl} n'existe pas.`
    });
});

// 500 error management
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        error: err.name || 'InternalServerError',
        message: process.env.ENV === 'dev' ? err.message || 'Une erreur est survenu sur le serveur.' : 'Une erreur est survenu sur le serveur.'
    });
});

export default app;