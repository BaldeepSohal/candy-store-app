import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";
import { Request, Response } from "express";

export default class StoreService {

  async getStores(query: { page: string; pageSize: string; }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalStores = await db("store");
      const totalPages = Math.ceil(totalStores.length / pageSize);

      const paginatedStores = await db("store").limit(pageSize).offset(offset);

      return {
        'page': page,
        'per_page': pageSize,
        'page_count': totalPages,
        'total': totalStores.length,
        'stores': paginatedStores,
      };

    } catch (err) {
      console.error(err);
      return err;
    }
  };

  async getStore(id: string) {
    try {
      const store = await db("store").where("store_id", id);

      if (!store) {
        return;
      }
      return store;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  async addStore(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const result = await db('store').insert({ store_address: req.body.address, 
        store_manager_name: req.body.manager_name })
        .catch(async function (err) {
          return err;
        })  

      // Send new Store in response
      const store = await this.getStore(result[0]);
      return store;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async updateStore(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const store = await this.getStore(req.params.id);
      if (store == '') {
        return {'status': 'error' , 'message': 'Store not found!'};
      }

      const result = await db('store').update({ store_address: req.body.address, 
        store_manager_name: req.body.manager_name })
        .catch(async function (err) {
          return err;
      });

      // Send updated Store in response
      const updatedStore = await this.getStore(req.params.id);
      return updatedStore;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


