import { Router } from "express";
import * as itemController from '../controllers/itemController';

const router = Router();

router.get('/items', itemController.getItems);
router.post('/items', itemController.postItem);
//TODO: router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);