import jwt from 'jsonwebtoken';

import { jwtConfig } from '~/config/jwt';

export const jwtSign = (sub: string, payload: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!jwtConfig.secret || jwtConfig.secret === '') {
      reject(new Error('`JWT_SECRET` is required'));
    }
    try {
      const token = jwt.sign(
        {
          sub,
          aud: sub,
          ...payload,
        },
        jwtConfig.secret,
        {
          algorithm: 'HS256',
          issuer: jwtConfig.issuer,
          expiresIn: jwtConfig.expiresIn,
        }
      );
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export const jwtVerify = (token: string, options: object = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!jwtConfig.secret || jwtConfig.secret === '') {
      reject(new Error('`JWT_SECRET` is required'));
    }
    try {
      const payload = jwt.verify(token, jwtConfig.secret, { algorithms: ['HS256'], ...options });
      resolve(payload as string);
    } catch (error) {
      reject(error);
    }
  });
};
