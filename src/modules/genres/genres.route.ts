import { Router } from 'express';

import * as genreCtrl from './genres.controller';

export const setRoutes = (router: Router) => {
  router.get('/genres', genreCtrl.index);
  router.post('/genres', genreCtrl.create);
  router.get('/genres/:id', genreCtrl.findById);
  router.put('/genres/:id', genreCtrl.update);
  router.delete('/genres/:id', genreCtrl.destroy);
};
