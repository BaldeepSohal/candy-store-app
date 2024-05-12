import express from "express";
import { body, validationResult } from "express-validator";
import Inventory from '../controllers/inventory';
const inventoryController = new Inventory();
const router = express.Router();

router.get('/' , inventoryController.getInventories);

router.get('/:id', inventoryController.getInventory);

router.post('/',
[body("inventory_name").notEmpty().isLength({ min: 3 }).trim()],
inventoryController.addInventory
)

router.put('/:id',
[body("inventory_name").notEmpty().isLength({ min: 3 }).trim()],
inventoryController.updateInventory
)

export default router;