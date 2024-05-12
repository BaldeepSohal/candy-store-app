import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";
import { Request, Response } from "express";
import { ICustomer } from '../models/customer';

/**
 * CustomerService
 */
export default class CustomerService {

  /**
	 * getCustomers
	 *
	 * @param {Object} query
	 * @return {Array}
	 */
  async getCustomers(query: { page: string; pageSize: string; }) {
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
	 * @return {Array}
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
	 * @param {object} req
	 * @return {Array}
	 */
  async addCustomer(req: { body: { name: any; }; }) {
    try {
      
      const data: ICustomer = {
          customer_name: req.body.name
      };

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
	 * @param {Request} req
	 * @return {Array}
	 */
  async updateCustomer(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {

      const data: ICustomer = {
        customer_name: req.body.name
      };

      const customer = await this.getCustomer(parseInt(req.params.id));
      if (customer == '') {
        return {'status': 'error' , 'message': 'customer not found!'};
      }

      const result = await db('customers').update(data).where("customer_id", req.params.id)
        .catch(async function (err) {
          return err;
      });

      // Send updated customer in response
      const updatedCustomer = await this.getCustomer(parseInt(req.params.id));
      return updatedCustomer;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


