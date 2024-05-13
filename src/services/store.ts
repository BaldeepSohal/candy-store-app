import db from "../../db/db-config";
import { IStore } from '../models/store'

/**
 * StoreService
 */
export default class StoreService {

  /**
	 * getStores
	 *
	 * @param {Object} query
	 * @return {Object}
	 */
  async getStores(query: { page: string; pageSize: string; } = {
    page: "",
    pageSize: ""
  }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalStores = await db("store");
      const totalPages = Math.ceil(totalStores.length / pageSize);

      const paginatedStores = await db("store")
      .select(db.raw('store_id, store_address, store_manager_name, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .limit(pageSize).offset(offset);

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

  /**
	 * getStore
	 *
	 * @param {number} id
	 * @return {Object}
	 */
  async getStore(id: number) {
    try {
      const store = await db("store")
      .select(db.raw('store_id, store_address, store_manager_name, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .where("store_id", id);

      if (!store) {
        return;
      }
      return store;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  /**
	 * addStore
	 *
	 * @param {IStore} data
	 * @return {Object}
	 */
  async addStore(data: IStore) {
    try {

      const result = await db('store').insert(data)
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

  /**
	 * updateStore
	 *
	 * @param {IStore} data
	 * @param {number} id
	 * @return {Object}
	 */
  async updateStore(id: number, data: IStore) {
    try {

      const store = await this.getStore(id);
      if (store == '') {
        return {'status': 'error' , 'message': 'Store not found!'};
      }

      const result = await db('store').update(data)
        .catch(async function (err) {
          return err;
      });

      // Send updated Store in response
      const updatedStore = await this.getStore(id);
      return updatedStore;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


