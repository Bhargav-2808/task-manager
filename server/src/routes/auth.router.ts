import { Router } from 'express';
import { signUp, singIn, verifyToken, googleSingIn } from '../controllers/auth.controller';
import { authenticateUser } from '../middleware/authMiddleWare';
import passport from 'passport';

export const authRouter = Router();

authRouter.post('/verify-token', authenticateUser, verifyToken);
authRouter.post('/sign-in', singIn);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get("/google/callback", (req, res, next) => {
    passport.authenticate("google", (err:unknown, user: any, info: unknown) => {
      if (err || !user) {
        console.log(err,"err")
        return res.redirect(`${process.env.CLIENT_URL}/login?error=Authentication%20Failed`);
      }
  
      const token = user.token;

      console.log(token, "token")
      res.redirect(`${process.env.CLIENT_URL}/google-auth-success?token=${token}`);
    })(req, res, next);
  });


authRouter.post('/register', signUp);
