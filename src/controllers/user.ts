import { Request, Response } from "express";
import UserService from '../services/user';
const userService = new UserService();
import { validationResult } from "express-validator";
import { IUser } from "../models/user";

/**
 * UserController
 */
export default class UserController {

	/**
	 * register a user
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async register(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const user = await userService.register(req, res);
			res.json(user)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

}


