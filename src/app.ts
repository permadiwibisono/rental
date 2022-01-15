/* eslint-disable no-console */
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { appConfig } from '~/config/app';
import { mongoConfig } from '~/config/mongo';
import { mongoClient } from '~/services/mongo';

export default class App {
  server: Express;

  constructor() {
    this.server = express();
    this.register();
  }

  // init and establish services
  async init() {
    const mongo = await mongoClient(mongoConfig);
    mongo.connection.on('close', () => console.log('MongoDB connection is closed'));
    mongo.connection.on('error', (error) => console.error('MongoDB error', error));
    console.log('MongoDB connection has been established successfully');
  }

  // register routes and middlewares
  register() {
    // middlewares
    this.server.use(compression());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cookieParser());
    this.server.use(cors({ credentials: true }));
    this.server.use(helmet({ contentSecurityPolicy: false }));
    this.server.use(morgan('tiny'));

    // routes
    this.server.use(
      express.static(path.join(__dirname, 'public'), {
        setHeaders: (res, urlPath) => {
          const hashRegExp = /\\.[0-9a-f]{8}\\./;

          if (urlPath.endsWith('.html')) {
            // All of the project's HTML files end in .html
            res.setHeader('Cache-Control', 'no-cache');
          } else if (hashRegExp.test(urlPath)) {
            // If the RegExp matched, then we have a versioned URL.
            res.setHeader('Cache-Control', 'max-age=31536000');
          }
        },
      })
    );
    this.server.use('/healthcheck', async (_, res: Response) => {
      try {
        await mongoClient(mongoConfig);
        res.status(200).send('OK');
      } catch (error) {
        console.log('error: ', error);
        res.status(500).send('Internal Server Error');
      }
    });
    this.server.get('/version', (_, res: Response) => {
      res.status(200).json({
        name: appConfig.name,
        env: appConfig.env,
        version: appConfig.version,
        statusCode: 200,
      });
    });
  }
}
