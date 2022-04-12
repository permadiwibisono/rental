import { Router } from 'express';

import { validateObjectID } from '~/middlewares';

import * as genreCtrl from './genres.controller';

export const setRoutes = (router: Router) => {
  router.get('/genres', genreCtrl.index);
  router.post('/genres', genreCtrl.create);
  router.get('/genres/:id', [validateObjectID], genreCtrl.findById);
  router.put('/genres/:id', [validateObjectID], genreCtrl.update);
  router.delete('/genres/:id', [validateObjectID], genreCtrl.destroy);
};
