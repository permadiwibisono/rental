import { Router } from 'express';

import * as userCtrl from './users.controller';

export const setRoutes = (router: Router) => {
  router.get('/users', userCtrl.index);
  router.post('/users', userCtrl.create);
  router.get('/users/:id', userCtrl.show);
  router.put('/users/:id', userCtrl.update);
  router.delete('/users/:id', userCtrl.destroy);
};
