import express from 'express';
import apiRouter from './api.routes';

const router = express.Router();
router.use('/api', apiRouter);

export default router;