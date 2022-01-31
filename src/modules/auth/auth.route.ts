import { Router } from 'express';

import * as authCtrl from './auth.controller';

export const setRoutes = (router: Router) => {
  router.post('/auth/register', authCtrl.register);
  router.post('/auth/login', authCtrl.login);
};
