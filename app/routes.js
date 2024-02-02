import express from 'express'
import router from '../routes/studentRoute.js';

const globalRouter = express.Router();

globalRouter.use('/api/v1',router);

export default globalRouter