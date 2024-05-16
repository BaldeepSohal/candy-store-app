import express, { Request, Response } from "express";
const router = express.Router();
import { validationResult } from "express-validator";
import db from "../../db/db-config";
import { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

export default router.post("/", async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

      const user: any = await db("user").select('id', 'email', 'password').where("email", req.body.email);
      if (user == '') return res.status(400).json({'status': 'error' , 'message': "Invalid email or password."});


      const validPassword = await bcrypt.compare(req.body.password, user[0].password);
      if (!validPassword) return res.status(400).json({'status': 'error' , 'message': "Invalid email or password"});

      res.send({
        _token: jwt.sign({id: user[0].id}, config.get('jwtPrivateKey'))
      });

    } catch (err) {
      console.error(err);
      return err;
    }
  });