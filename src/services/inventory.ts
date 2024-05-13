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
	 * @return {Object}
	 */
  async getInventories(query: { page: string; pageSize: string; } = {
    page: "",
    pageSize: ""
  }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalInventories = await db("inventory");
      const totalPages = Math.ceil(totalInventories.length / pageSize);

      const paginatedInventories = await db("inventory")
      .select(db.raw('inventory_id, inventory_name, DATE_FORMAT(manufacture_date, "%Y-%m-%d") AS manufacture_date, available_quantity, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
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
	 * @return {Object}
	 */
  async getInventory(id: number) {
    try {
      const inventory: any = await db("inventory")
      .select(db.raw('inventory_id, inventory_name,  DATE_FORMAT(manufacture_date, "%Y-%m-%d") AS manufacture_date, available_quantity, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
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
	 * @param {IInventory} data
	 * @return {Object}
	 */
  async addInventory(data: IInventory) {
    try {
      
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
	 * @param {IInventory} data
	 * @param {number} id
	 * @return {Object}
	 */
  async updateInventory(data: IInventory, id: number) {
    try {
      
      const inventory = await this.getInventory(id);
      if (inventory == '') {
        return {'status': 'error' , 'message': 'inventory not found!'};
      }

      const result = await db('inventory').update(data).where("inventory_id", id)
        .catch(async function (err) {
          return err;
      });

      // Send updated inventory in response
      const updatedInventory = await this.getInventory(id);
      return updatedInventory;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


