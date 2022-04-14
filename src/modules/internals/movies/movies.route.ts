import { Router } from 'express';

import { authenticate, authMiddleware, validateObjectID } from '~/middlewares';

import * as movieCtrl from './movies.controller';

export const setRoutes = (router: Router) => {
  router.get('/movies', [authMiddleware, authenticate], movieCtrl.index);
  router.post('/movies', [authMiddleware, authenticate], movieCtrl.create);
  router.get('/movies/:id', [authMiddleware, authenticate, validateObjectID], movieCtrl.findById);
  router.put('/movies/:id', [authMiddleware, authenticate, validateObjectID], movieCtrl.update);
  router.delete('/movies/:id', [authMiddleware, authenticate, validateObjectID], movieCtrl.destroy);
};
