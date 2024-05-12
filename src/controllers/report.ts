import { Request, Response } from "express";
import ReportService from '../services/report';
const reportService = new ReportService();

/**
 * InventoryController
 */
export default class CustomerController {

	/**
	 * getReport
	 *
	 * @param {any} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getReport(req: any, res: Response) {
		try {
			const orders = await reportService.getReport(req.query);
			res.json(orders);
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


