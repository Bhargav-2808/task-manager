import { Request, Response } from 'express';
import { asyncMW } from '../utils/asyncMW';
import { signInInputSchema, signUpInputSchema } from '../validation/auth.validation';
import { jwtNumericDate, jwtSign } from '../utils/jwt';
import ResponseHandler from '../utils/responseHandler';
import { passwordHash, passwordMatch } from '../utils/errors/security';
import { createUser, findUserByEmail } from '../services/auth.service';
import { AuthenticatedRequest } from '../types/request';
import { UserDocument } from '../models/schemas/user.schema';

const TOKEN_EXP_TIME = 24 * 12 * 60 * 60;

export const singIn = asyncMW(async (req: Request, res: Response) => {
  const validatedInput = signInInputSchema.safeParse(req.body);

  if (!validatedInput.success) {
    return ResponseHandler.badRequest(res, validatedInput.error.format(), 'Invalid body parameters');
  }

  const { email, password } = validatedInput.data;

  const user = await findUserByEmail(email);

  if (!user) {
    return ResponseHandler.notFound(res, 'Incorrect email or password');
  }

  const isMatched = await passwordMatch(password, user.password);

  if (!isMatched) {
    return ResponseHandler.notFound(res, 'Incorrect email or password');
  }

  const token = jwtSign({
    kind: 'user-authentication-token',
    sub: { id: user._id },
    iat: jwtNumericDate(new Date()),
    exp: jwtNumericDate(new Date()) + TOKEN_EXP_TIME,
  });

  return ResponseHandler.success(res, { token, user }, 'SignIn successfully !!');
});

export const signUp = asyncMW(async (req: Request, res: Response) => {
  const validatedInput = signUpInputSchema.safeParse(req.body);

  if (!validatedInput.success) {
    return ResponseHandler.badRequest(res, validatedInput.error.format(), 'Invalid body parameters');
  }

  const { email, password } = validatedInput.data;

  const alreadyExistUser = await findUserByEmail(email);

  if (alreadyExistUser) {
    return ResponseHandler.conflict(res, 'User already exists');
  }

  const encryptedPassword = await passwordHash(password);

  const user = await createUser({
    ...validatedInput.data,
    password: encryptedPassword,
  });

  return ResponseHandler.created(res, { user }, 'User added successfully !!');
});

export const verifyToken = asyncMW(async (req: AuthenticatedRequest, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return ResponseHandler.unAuthorized(res, 'Unauthorized');
  }

  const user = req.user as UserDocument;
  return ResponseHandler.success(res, { user }, 'Token verified!!');
});