import { Router } from "express";
import { auth } from '../middlewares/auth';
import * as orderController from '../controllers/orderController';

const router = Router();

router.get('/order/teste', auth, orderController.checkout);
//router.post('/order/:id')

export default router;