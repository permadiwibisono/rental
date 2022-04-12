import { Router } from 'express';

import { validateObjectID } from '~/middlewares';

import * as userCtrl from './users.controller';

export const setRoutes = (router: Router) => {
  router.get('/users', userCtrl.index);
  router.post('/users', userCtrl.create);
  router.get('/users/:id', [validateObjectID], userCtrl.show);
  router.put('/users/:id', [validateObjectID], userCtrl.update);
  router.delete('/users/:id', [validateObjectID], userCtrl.destroy);
};
