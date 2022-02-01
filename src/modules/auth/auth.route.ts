import { Router } from 'express';

import { authMiddleware } from '~/middlewares';

import * as authCtrl from './auth.controller';

export const setRoutes = (router: Router) => {
  router.get('/auth/me', [authMiddleware], authCtrl.me);
  router.post('/auth/register', authCtrl.register);
  router.post('/auth/login', authCtrl.login);
};
