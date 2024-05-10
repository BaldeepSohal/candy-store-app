import express, { Express, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Order from '../controllers/order';
const orderController = new Order();
const router = express.Router();

router.get('/' , orderController.getOrders);

router.get('/:id', orderController.getOrder);


router.post('/',
[
    body("customer_id").notEmpty().trim(),
    body("inventory_id").notEmpty().trim(),
    body("store_id").notEmpty().trim(),
    body("quantity").notEmpty().isNumeric().trim(),
    body("status").notEmpty().isString().trim()
],
  orderController.addOrder
)


router.put('/:id',
[
    body("customer_id").notEmpty().trim(),
    body("inventory_id").notEmpty().trim(),
    body("store_id").notEmpty().trim(),
    body("quantity").notEmpty().isNumeric().trim(),
    body("status").notEmpty().isString().trim()
],
  orderController.updateOrder
)

export default router;