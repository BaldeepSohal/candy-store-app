import express, { Express, Request, Response } from "express";
import { body } from "express-validator";
import Store from '../controllers/store';
const StoreController = new Store();
const router = express.Router();

router.get('/' , StoreController.getStores);

router.get('/:id', StoreController.getStore);


router.post('/', [
    body("address").notEmpty().isLength({ min: 3 }).trim(),
    body("manager_name").notEmpty().isLength({ min: 3 }).trim(),
],
  StoreController.addStore
)

router.put('/:id', [
    body("address").notEmpty().isLength({ min: 3 }).trim(),
    body("manager_name").notEmpty().isLength({ min: 3 }).trim(),
],
  StoreController.updateStore
)

export default router;