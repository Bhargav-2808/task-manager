import { Router } from 'express';
import { getGeneralSetting, getRoles, getUsers, signUp, singIn, updateGeneralSetting, updateUser, verifyToken } from '../controllers/auth.controller';
import { authenticateUser } from '../middleware/authMiddleWare';

export const authRouter = Router();

authRouter.get('/get-roles', authenticateUser, getRoles);
authRouter.get('/get-users', authenticateUser, getUsers);
authRouter.post('/verify-token', authenticateUser, verifyToken);
authRouter.post('/sign-in', singIn);
authRouter.post('/add-user', signUp);
authRouter.get('/general-setting', getGeneralSetting);
authRouter.put('/:id', authenticateUser, updateUser);
authRouter.put('/general-setting/:id', updateGeneralSetting);
