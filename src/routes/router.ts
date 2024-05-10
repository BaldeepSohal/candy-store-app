import express from "express";
const router = express.Router();

import customers from './customer.route';
import inventories from './inventory.route';
import store from './store.route';
import order from './order.route';
import report from './report.route';

router.use('/api/customers', customers);
router.use('/api/inventories', inventories);
router.use('/api/stores', store);
router.use('/api/orders', order);
router.use('/api/report', report);

export default router;