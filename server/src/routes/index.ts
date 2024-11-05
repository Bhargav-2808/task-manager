import { Router } from 'express';
import { authRouter } from './auth.router';
import { taskRouter } from './task.router';
import { authenticateUser } from '../middleware/authMiddleWare';

export const router = Router();

router.use('/auth', authRouter);
router.use('/task', authenticateUser, taskRouter);
