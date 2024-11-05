import { Router } from 'express';
import { signUp, singIn, verifyToken, googleSingIn } from '../controllers/auth.controller';
import { authenticateUser } from '../middleware/authMiddleWare';

export const authRouter = Router();


authRouter.post('/verify-token', authenticateUser, verifyToken);
authRouter.post('/sign-in', singIn);
authRouter.post('/sign-in/google', googleSingIn);
authRouter.post('/register', signUp);
