import { Request, Response } from "express";
import db from "../../db/db-config";
import { IUser } from '../models/user';
import _ from 'lodash';
import bcrypt from 'bcrypt';

/**
 * UserService
 */
export default class UserService {

  /**
	 * register a user
	 *
	 * @param {Request} res
	 * @param {Response} res
	 * @return {Object}
	 */
  async register(req: Request<any>, res: Response<any>) {
    try {
      const user: any = await db("user").where("email", req.body.email);
      
      if (user != '') {
        return {'status': 'error' , 'message': "User already registered."};
      }

      const data:IUser = _.pick(req.body, ['name', 'email', 'password']);

      const salt: string = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);

      const result = await db('user').insert(data).catch(async function (err) {
        return err;
      });

      const newUser: any = await db("user").select('id', 'name', 'email').where("id", result[0]);
      return newUser;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

}


