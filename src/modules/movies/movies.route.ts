import { Router } from 'express';

import * as movieCtrl from './movies.controller';

export const setRoutes = (router: Router) => {
  router.get('/movies', movieCtrl.index);
  router.post('/movies', movieCtrl.create);
  router.get('/movies/:id', movieCtrl.findById);
  router.put('/movies/:id', movieCtrl.update);
  router.delete('/movies/:id', movieCtrl.destroy);
};
