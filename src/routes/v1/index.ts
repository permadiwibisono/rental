import express from 'express';

import * as genres from '~/modules/genres/genres.route';

const v1Router = express.Router();

genres.setRoutes(v1Router);

export default v1Router;
