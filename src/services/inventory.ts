import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";
import { IInventory } from '../models/inventory';

/**
 * InventoryService
 */
export default class InventoryService {

  /**
	 * getInventories
	 *
	 * @param {Object} query
	 * @return {Array}
	 */
  async getInventories(query: { page: string; pageSize: string; }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalInventories = await db("inventory");
      const totalPages = Math.ceil(totalInventories.length / pageSize);

      const paginatedInventories = await db("inventory")
      .select(db.raw('inventory_id, inventory_name, manufacture_date, available_quantity, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .limit(pageSize).offset(offset);

      return {
        'page': page,
        'per_page': pageSize,
        'page_count': totalPages,
        'total': totalInventories.length,
        'inventories': paginatedInventories,
      };

    } catch (err) {
      console.error(err);
      return err;
    }
  };

  /**
	 * getInventory
	 *
	 * @param {number} id
	 * @return {Array}
	 */
  async getInventory(id: number) {
    try {
      const inventory: any = await db("inventory")
      .select(db.raw('inventory_id, inventory_name, manufacture_date, available_quantity, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .where("inventory_id", id);
      if (inventory == '') {
        return {'status': 'error' , 'message': 'inventory not found!'};
      }

      return inventory;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  /**
	 * addInventory
	 *
	 * @param {Request} req
	 * @return {Array}
	 */
  async addInventory(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const data: IInventory = {inventory_name: req.body.inventory_name,
        manufacture_date: req.body.manufacture_date,
        available_quantity: req.body.available_quantity
      };
      const result = await db('inventory').insert(data)
        .catch(async function (err) {
          return err;
        })

      // Send new inventory in response
      const inventory = await this.getInventory(result[0]);
      return inventory;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

  /**
	 * updateInventory
	 *
	 * @param {Request} req
	 * @return {Array}
	 */
  async updateInventory(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const data: IInventory = { inventory_name: req.body.inventory_name,
        manufacture_date: req.body.manufacture_date,
        available_quantity: req.body.available_quantity
      };
      const inventory = await this.getInventory(parseInt(req.params.id));
      if (inventory == '') {
        return {'status': 'error' , 'message': 'inventory not found!'};
      }

      const result = await db('inventory').update(data).where("inventory_id", req.params.id)
        .catch(async function (err) {
          return err;
      });

      // Send updated inventory in response
      const updatedInventory = await this.getInventory(parseInt(req.params.id));
      return updatedInventory;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


