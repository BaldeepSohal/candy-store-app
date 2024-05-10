import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";
import { Request, Response } from "express";

export default class CustomerService {

  async getCustomers(query: { page: string; pageSize: string; }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalCustomers = await db("customers");
      const totalPages = Math.ceil(totalCustomers.length / pageSize);

      const paginatedCustomers = await db("customers").limit(pageSize).offset(offset);

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

  async getCustomer(id: string) {
    try {
      const customer: any = await db("customers").where("customer_id", id);
      if (customer == '') {
        return {'status': 'error' , 'message': 'customer not found!'};
      }
      return customer;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  async addCustomer(req: { body: { name: any; }; }) {
    try {
      const result = await db('customers').insert({ customer_name: req.body.name })
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

  async updateCustomer(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const customer = await this.getCustomer(req.params.id);
      if (customer == '') {
        return {'status': 'error' , 'message': 'customer not found!'};
      }

      const result = await db('customers').update({ customer_name: req.body.name }).where("customer_id", req.params.id)
        .catch(async function (err) {
          return err;
      });

      // Send updated customer in response
      const updatedCustomer = await this.getCustomer(req.params.id);
      return updatedCustomer;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


