import { Request, Response } from "express";
import StoreService from '../services/store';
const storeService = new StoreService();
import { validationResult } from "express-validator";
import { IStore } from "../models/store";

/**
 * InventoryController
 */
export default class StoreController {

	/**
	 * getStores
	 *
	 * @param {any} req
	 * @param {Response} res
	 * @return {JSON}
	 */
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


	/**
	 * getStore
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async getStore(req: Request, res: Response) {
		console.log('getting a single Store');
		try {
			const Store = await storeService.getStore(parseInt(req.params.id));
			res.json(Store)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * addStore
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async addStore(req: Request, res: Response) {
		console.log('adding Store');
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const data: IStore = { store_address: req.body.address, 
				store_manager_name: req.body.manager_name };
			
			const Store = await storeService.addStore(data);
			res.json(Store)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}

	/**
	 * updateStore
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @return {JSON}
	 */
	async updateStore(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const data: IStore = { store_address: req.body.address, 
				store_manager_name: req.body.manager_name };

			const store = await storeService.updateStore(parseInt(req.params.id), data);
			res.json(store)
		}
		catch (err) {
			res.status(500).send(err);
		}
	}
}


