import { Router } from 'express';

import * as movieCtrl from './movies.controller';

export const setRoutes = (router: Router) => {
  router.get('/movies', movieCtrl.index);
  router.post('/movies', movieCtrl.create);
};
