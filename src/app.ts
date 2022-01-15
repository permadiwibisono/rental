import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

export default class App {
  server: Express;

  constructor() {
    this.server = express();
  }

  init() {
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
    this.server.use('/healthcheck', (_, res: Response) => {
      res.status(200).send('OK');
    });
    this.server.get('/version', (_, res: Response) => {
      res.status(200).json({
        version: 'beta',
        statusCode: 200,
      });
    });
  }
}
