import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '~/commons/errors';
import { findUserLogin } from '~/modules/auth/auth.service';
import { jwtVerify } from '~/utils';

export const authMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  let token = req.header('authorization');
  if (!token) {
    next(new UnauthorizedError('Token not provided'));
    return;
  }
  if (/^Bearer /.test(token)) {
    token = token.replace(/^Bearer /, '').trim();
  }

  try {
    const payloads = await jwtVerify(token);
    const decoded = payloads as JWTUser;
    req.user = decoded;
    req.user.id = decoded.sub;
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
  } catch (error) {
    const jwtErrorType = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];
    if (error.name && jwtErrorType.includes(error.name)) {
      next(new UnauthorizedError(error.name));
      return;
    }
    next(error);
    return;
  }
  next();
};

export const authenticate = async (req: Request, _: Response, next: NextFunction) => {
  if (!req.user) {
    next(new UnauthorizedError());
    return;
  }

  const { id, email } = req.user;
  const user = await findUserLogin(id, email);
  if (!user || !user.isAdmin) {
    next(new UnauthorizedError());
    return;
  }
  next();
};
