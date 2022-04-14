import express from 'express';

import v1Router from './v1';
import internalRouter from './v1/internal-router';

const router = express.Router();
router.use('/v1/internals', internalRouter);
router.use('/v1', v1Router);

export default router;
