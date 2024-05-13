import { Request, Response } from "express";
import InventoryService from '../services/inventory';
const inventoryService = new InventoryService();
import { validationResult } from "express-validator";
import { IInventory } from "../models/inventory";

/**
 * InventoryController
 */
export default class InventoryController {

	/**
	 * getInventories
	 *
	 * @param {any} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getInventories(req: any, res: Response) {
		try {
			const Inventory = await inventoryService.getInventories(req.query);
			res.json(Inventory);
		}
		catch (err) {
			res.status(500).send(err);
		}
	}


	/**
	 * getInventory
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getInventory(req: Request, res: Response) {
		try {
			const Inventory = await inventoryService.getInventory(parseInt(req.params.id));
			res.json(Inventory)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * addInventory
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async addInventory(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const data: IInventory = {inventory_name: req.body.inventory_name,
				manufacture_date: req.body.manufacture_date,
				available_quantity: req.body.available_quantity
			  };
			
			const Inventory = await inventoryService.addInventory(data);
			res.json(Inventory)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * updateInventory
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async updateInventory(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const data: IInventory = {inventory_name: req.body.inventory_name,
				manufacture_date: req.body.manufacture_date,
				available_quantity: req.body.available_quantity
			  };

			const inventory = await inventoryService.updateInventory(data, parseInt(req.params.id));
			res.json(inventory)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


