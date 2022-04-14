import { Router } from 'express';

import { validateObjectID } from '~/middlewares';

import * as genreCtrl from './genres.controller';

export const setRoutes = (router: Router) => {
  router.get('/genres', genreCtrl.index);
  router.get('/genres/:id', [validateObjectID], genreCtrl.findById);
};
