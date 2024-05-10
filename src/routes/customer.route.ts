import express, { Express, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Customer from '../controllers/customer';
const customerController = new Customer();
const router = express.Router();

router.get('/' , customerController.getCustomers);

router.get('/:id', customerController.getCustomer);

router.post('/',
[body("name").notEmpty().isLength({ min: 3, max:10 }).trim()],
  customerController.addCustomer
)

router.put('/:id',
[body("name").notEmpty().isLength({ min: 3, max:10 }).trim()],
  customerController.updateCustomer
)

export default router;