import { Router } from 'express';

import { validateObjectID } from '~/middlewares';

import * as movieCtrl from './movies.controller';

export const setRoutes = (router: Router) => {
  router.get('/movies', movieCtrl.index);
  router.post('/movies', movieCtrl.create);
  router.get('/movies/:id', [validateObjectID], movieCtrl.findById);
  router.put('/movies/:id', [validateObjectID], movieCtrl.update);
  router.delete('/movies/:id', [validateObjectID], movieCtrl.destroy);
};
