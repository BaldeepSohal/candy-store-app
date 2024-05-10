import { Request, Response } from "express";
import StoreService from '../services/store';
const storeService = new StoreService();
import { validationResult } from "express-validator";

export default class StoreController {
	async getStores(req: any, res: Response) {
		console.log('getting Stores');
		try {
			const Stores = await storeService.getStores(req.query);
			res.json(Stores);
		}
		catch (err) {
			res.status(500).send(err);
		}
	}


	async getStore(req: Request, res: Response) {
		console.log('getting a single Store');
		try {
			const Store = await storeService.getStore(req.params.id);
			res.json(Store)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	async addStore(req: Request, res: Response) {
		console.log('adding Store');
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			
			const Store = await storeService.addStore(req);
			res.json(Store)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	async updateStore(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const store = await storeService.updateStore(req);
			res.json(store)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


