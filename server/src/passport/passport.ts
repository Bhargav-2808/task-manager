import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { Request } from 'express';
import { createUser, findUserByEmail } from '../services/auth.service'; // Assuming a createUser service function
import jwt from 'jsonwebtoken';
import { TOKEN_EXP_TIME } from '../controllers/auth.controller';
import { jwtSign } from '../utils/jwt';
import { jwtNumericDate } from '../utils/jwt';

// Define the Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
      callbackURL: '/api/v1/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    },
    async (req: Request, accessToken: string, refreshToken: string, params: any, profile: Profile, done: VerifyCallback) => {
      try {
        let dbUser = await findUserByEmail(profile?.emails?.[0].value || ' ');

        if (!dbUser) {
          dbUser = await createUser({
            first_name: profile.name?.givenName,
            last_name: profile.name?.familyName,
            email: profile?.emails?.[0].value || '',
            is_active: true,
            password: 'GOOGLE_AUTH',
          });
        }

        const token = jwtSign({
          kind: 'user-authentication-token',
          sub: { id: dbUser._id },
          iat: jwtNumericDate(new Date()),
          exp: jwtNumericDate(new Date()) + TOKEN_EXP_TIME,
        });

        console.log(dbUser, token);
        done(null, { dbUser, token });
      } catch (error) {
        done(error, undefined);
      }
    },
  ),
);

// Serialize and Deserialize
passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
