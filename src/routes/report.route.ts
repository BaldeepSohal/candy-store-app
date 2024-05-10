import express, { Express, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import reports from '../controllers/report';
const reportsController = new reports();
const router = express.Router();

router.get('/' , reportsController.getReport);

export default router;