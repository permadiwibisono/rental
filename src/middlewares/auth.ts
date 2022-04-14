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
    const user = await findUserLogin(decoded.sub, decoded.email);
    if (!user) {
      next(new UnauthorizedError());
      return;
    }

    req.user = decoded;
    req.user.id = decoded.sub;
    req.user.roles = [];
    if (user.isAdmin) {
      req.user.roles = ['admin'];
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

export const authenticate = (req: Request, _: Response, next: NextFunction) => {
  if (!req.user) {
    next(new UnauthorizedError());
    return;
  }
  const { roles } = req.user;
  if (!roles.includes('admin')) {
    next(new UnauthorizedError());
    return;
  }
  next();
};
