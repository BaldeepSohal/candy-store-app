import { Request, Response } from "express";
import OrderService from '../services/order';
const orderService = new OrderService();
import { validationResult } from "express-validator";
import { IOrder } from "../models/order";

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

			const data: IOrder = {
				customer_id: req.body.customer_id,
				inventory_id: req.body.inventory_id,
				store_id: req.body.store_id,
				quantity: req.body.quantity,
				status: req.body.status
			  };
			
			const Order = await orderService.addOrder(data);
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

			const data: IOrder = {
				customer_id: req.body.customer_id,
				inventory_id: req.body.inventory_id,
				store_id: req.body.store_id,
				quantity: req.body.quantity,
				status: req.body.status
			  };

			const order = await orderService.updateOrder(data, parseInt(req.params.id));
			res.json(order)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


