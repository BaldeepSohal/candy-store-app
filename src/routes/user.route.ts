import express from "express";
import { body, validationResult } from "express-validator";
import User from '../controllers/user';
const userController = new User();
const router = express.Router();

router.post('/register',
[
  body("name").notEmpty().isLength({ min: 2, max:30 }).trim(),
  body("email").notEmpty().isEmail().trim(),
  body("password").notEmpty().isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }).trim().withMessage('Password should be minimum 8 characters long and should include a lowercase, an uppercase, a number and a symbol'),
  
],
  userController.register
)


export default router;