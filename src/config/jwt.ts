import 'dotenv/config';

const expiresIn = 3600 * 24 * 7;

export const jwtConfig = {
  responseHeader: process.env.JWT_RESPONSE_HEADER || 'x-auth-token',
  issuer: process.env.JWT_ISSUER || 'http://localhost:4000',
  secret: process.env.JWT_SECRET || '',
  expiresIn,
  refreshExpiresIn: expiresIn + (Math.floor(expiresIn / 2) ? Math.floor(expiresIn / 2) : 1),
};
