import express from "express";
import reports from '../controllers/report';
const reportsController = new reports();
const router = express.Router();

router.get('/' , reportsController.getReport);

export default router;