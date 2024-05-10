import { Request, Response } from "express";
import InventoryService from '../services/inventory';
const inventoryService = new InventoryService();
import { validationResult } from "express-validator";

export default class InventoryController {
	async getInventories(req: any, res: Response) {
		try {
			const Inventory = await inventoryService.getInventories(req.query);
			res.json(Inventory);
		}
		catch (err) {
			res.status(500).send(err);
		}
	}


	async getInventory(req: Request, res: Response) {
		try {
			const Inventory = await inventoryService.getInventory(req.params.id);
			res.json(Inventory)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	async addInventory(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			
			const Inventory = await inventoryService.addInventory(req);
			res.json(Inventory)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	async updateInventory(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const inventory = await inventoryService.updateInventory(req);
			res.json(inventory)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


