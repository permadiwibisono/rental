import express, { Express, Response } from 'express';

export default class App {
  server: Express;

  constructor() {
    this.server = express();
  }

  init() {
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
