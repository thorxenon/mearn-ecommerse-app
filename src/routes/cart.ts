import { Router } from 'express';
import * as cartController from '../controllers/cartController';

const router = Router();

router.get('/cart/:id' , cartController.getCartItem);
router.post('/cart/:id', cartController.addCartItem);
router.delete('/cart/:userId/:itemId', cartController.deleteItem);

export default router;