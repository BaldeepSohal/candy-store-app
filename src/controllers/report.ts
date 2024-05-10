import { Request, Response } from "express";
import CustomerService from '../services/customer';
const customerService = new CustomerService();
import { validationResult } from "express-validator";

export default class CustomerController {
	async getReport(req: any, res: Response) {
		try {
			const customers = await customerService.getCustomers(req.query);
			res.json(customers);
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


