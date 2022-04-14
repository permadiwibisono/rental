import { Router } from 'express';

import { authenticate, authMiddleware, validateObjectID } from '~/middlewares';

import * as userCtrl from './users.controller';

export const setRoutes = (router: Router) => {
  router.get('/users', [authMiddleware, authenticate], userCtrl.index);
  router.post('/users', [authMiddleware, authenticate], userCtrl.create);
  router.get('/users/:id', [authMiddleware, authenticate, validateObjectID], userCtrl.show);
  router.put('/users/:id', [authMiddleware, authenticate, validateObjectID], userCtrl.update);
  router.delete('/users/:id', [authMiddleware, authenticate, validateObjectID], userCtrl.destroy);
};
