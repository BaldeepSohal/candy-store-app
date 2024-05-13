import db from "../../db/db-config";
import { ICustomer } from '../models/customer';

/**
 * CustomerService
 */
export default class CustomerService {

  /**
	 * getCustomers
	 *
	 * @param {Object} query
	 * @return {Object}
	 */
  async getCustomers(query: { page: string; pageSize: string; } = {
    page: "",
    pageSize: ""
  }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalCustomers = await db("customers");
      const totalPages = Math.ceil(totalCustomers.length / pageSize);

      const paginatedCustomers = await db("customers")
      .select(db.raw('customer_id, customer_name, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .limit(pageSize).offset(offset);

      return {
        'page': page,
        'per_page': pageSize,
        'page_count': totalPages,
        'total': totalCustomers.length,
        'customers': paginatedCustomers,
      };

    } catch (err) {
      console.error(err);
      return err;
    }
  };

  /**
	 * getCustomer
	 *
	 * @param {number} id
	 * @return {Object}
	 */
  async getCustomer(id: number) {
    try {
      const customer: any = await db("customers")
      .select(db.raw('customer_id, customer_name, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .where("customer_id", id);
      if (customer == '') {
        return {'status': 'error' , 'message': 'customer not found!'};
      }
      return customer;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  /**
	 * addCustomer
	 *
	 * @param {ICustomer} data
	 * @return {Object}
	 */
  async addCustomer(data: ICustomer) {
    try {
      const result = await db('customers').insert(data)
        .catch(async function (err) {
          return err;
        })

      // Send new customer in response
      const customer = await this.getCustomer(result[0]);
      return customer;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

  /**
	 * updateCustomer
	 *
	 * @param {number} id
	 * @param {ICustomer} data
	 * @return {Object}
	 */
  async updateCustomer(id: number, data: ICustomer) {
    try {

      const customer = await this.getCustomer(id);
      if (customer == '') {
        return {'status': 'error' , 'message': 'customer not found!'};
      }

      const result = await db('customers').update(data).where("customer_id", id)
        .catch(async function (err) {
          return err;
      });

      // Send updated customer in response
      const updatedCustomer = await this.getCustomer(id);
      return updatedCustomer;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


