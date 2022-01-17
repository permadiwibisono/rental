import 'dotenv/config';

export const appConfig = {
  name: process.env.APP_NAME || "Rental's API",
  nodeEnv: process.env.NODE_ENV || 'development',
  env: process.env.APP_ENV || 'local',
  version: process.env.APP_VERSION || '0.0.1',
};
