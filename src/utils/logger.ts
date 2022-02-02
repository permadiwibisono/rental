import pino from 'pino';

import { appConfig } from '~/config/app';

export const createLogger = (level: string | null = null) => {
  let { logLevel } = appConfig;
  if (level) {
    logLevel = level;
  }
  return pino({
    level: appConfig.nodeEnv === 'production' ? 'info' : logLevel,
  });
};

const logger = createLogger();

export default logger;
