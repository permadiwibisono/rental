import { Router } from 'express';

import { validateObjectID } from '~/middlewares';

import * as movieCtrl from './movies.controller';

export const setRoutes = (router: Router) => {
  router.get('/movies', movieCtrl.index);
  router.get('/movies/:id', [validateObjectID], movieCtrl.findById);
};
