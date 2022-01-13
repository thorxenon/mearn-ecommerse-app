import { Router } from "express";
import * as authController from '../controllers/authController';
//TODO: middleware auth

const router = Router();

router.post('/register', authController.signUp);
//router.post('/login',);
//router.get('/user');

export default router;