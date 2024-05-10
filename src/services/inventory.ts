import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";

export default class InventoryService {

  async getInventories(query: { page: string; pageSize: string; }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalInventories = await db("inventory");
      const totalPages = Math.ceil(totalInventories.length / pageSize);

      const paginatedInventories = await db("inventory").limit(pageSize).offset(offset);

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

  async getInventory(id: string) {
    try {
      const inventory: any = await db("inventory").where("inventory_id", id);
      if (inventory == '') {
        return {'status': 'error' , 'message': 'inventory not found!'};
      }

      return inventory;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  async addInventory(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const data = {inventory_name: req.body.name,
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

  async updateInventory(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const data = {inventory_name: req.body.name,
        manufacture_date: req.body.manufacture_date,
        available_quantity: req.body.available_quantity
      };
      const inventory = await this.getInventory(req.params.id);
      if (inventory == '') {
        return {'status': 'error' , 'message': 'inventory not found!'};
      }

      const result = await db('inventory').update(data).where("inventory_id", req.params.id)
        .catch(async function (err) {
          return err;
      });

      // Send updated inventory in response
      const updatedInventory = await this.getInventory(req.params.id);
      return updatedInventory;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


