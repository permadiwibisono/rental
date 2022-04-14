import express from 'express';

import * as genres from '~/modules/internals/genres/genres.route';
import * as movies from '~/modules/internals/movies/movies.route';
import * as users from '~/modules/internals/users/users.route';

const internalRouter = express.Router();
genres.setRoutes(internalRouter);
movies.setRoutes(internalRouter);
users.setRoutes(internalRouter);

export default internalRouter;
