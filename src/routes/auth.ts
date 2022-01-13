import { Router } from "express";
import * as authController from '../controllers/authController';
//TODO: middleware auth

const router = Router();

router.post('/register', authController.signUp);
router.post('/login', authController.login);
//router.get('/user', authController.user);

export default router;