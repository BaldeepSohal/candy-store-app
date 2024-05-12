import { Request, Response } from "express";
import CustomerService from '../services/customer';
const customerService = new CustomerService();
import { validationResult } from "express-validator";

/**
 * CustomerController
 */
export default class CustomerController {
	
	/**
	 * getCustomers
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getCustomers(req: any, res: Response) {
		try {
			const customers = await customerService.getCustomers(req.query);
			res.json(customers);
		}
		catch (err) {
			res.status(500).send(err);
		}
	}


	/**
	 * getCustomer
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getCustomer(req: Request, res: Response) {
		try {
			const customer = await customerService.getCustomer(parseInt(req.params.id));
			res.json(customer)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * addCustomer
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async addCustomer(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const customer = await customerService.addCustomer(req);
			res.json(customer)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * updateCustomer
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async updateCustomer(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const customer = await customerService.updateCustomer(req);
			res.json(customer)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


