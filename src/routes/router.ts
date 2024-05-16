import express from "express";
const router = express.Router();
import authenticate from '../middlewares/auth';

import customers from './customer.route';
import inventories from './inventory.route';
import store from './store.route';
import order from './order.route';
import report from './report.route';
import user from './user.route';
import auth from './auth.routes';

router.use('/api/customers', authenticate, customers);
router.use('/api/inventories', authenticate, inventories);
router.use('/api/stores', authenticate, store);
router.use('/api/orders', authenticate, order);
router.use('/api/report', authenticate, report);
router.use('/api/user', authenticate, user);
router.use('/api/auth', authenticate, auth);

export default router;