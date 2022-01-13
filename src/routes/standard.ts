import { Router } from 'express';
import * as routes from '../controllers/test';

const router = Router();

router.get('/ping', routes.ping );

export default router;