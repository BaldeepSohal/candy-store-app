import { Request, Response } from "express";
import OrderService from '../services/order';
const orderService = new OrderService();
import { validationResult } from "express-validator";

/**
 * InventoryController
 */
export default class OrderController {

	/**
	 * getOrders
	 *
	 * @param {any} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getOrders(req: any, res: Response) {
		try {
			const orders = await orderService.getOrders(req.query);
			res.json(orders);
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * getOrder
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getOrder(req: Request, res: Response) {
		try {
			const Order = await orderService.getOrder(parseInt(req.params.id));
			res.json(Order)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * addOrder
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async addOrder(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			
			const Order = await orderService.addOrder(req);
			res.json(Order)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * updateOrder
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async updateOrder(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const order = await orderService.updateOrder(req);
			res.json(order)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


