import { Router } from 'express';

import { authenticate, authMiddleware, validateObjectID } from '~/middlewares';

import * as genreCtrl from './genres.controller';

export const setRoutes = (router: Router) => {
  router.get('/genres', [authMiddleware, authenticate], genreCtrl.index);
  router.post('/genres', [authMiddleware, authenticate], genreCtrl.create);
  router.get('/genres/:id', [authMiddleware, authenticate, validateObjectID], genreCtrl.findById);
  router.put('/genres/:id', [authMiddleware, authenticate, validateObjectID], genreCtrl.update);
  router.delete('/genres/:id', [authMiddleware, authenticate, validateObjectID], genreCtrl.destroy);
};
