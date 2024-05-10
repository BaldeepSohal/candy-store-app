import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";
import { Request, Response } from "express";

export default class OrderService {

  async getOrders(query: { page: string; pageSize: string; }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalOrders = await db("order");
      const totalPages = Math.ceil(totalOrders.length / pageSize);

      const paginatedOrders = await db("order").limit(pageSize).offset(offset);

      return {
        'page': page,
        'per_page': pageSize,
        'page_count': totalPages,
        'total': totalOrders.length,
        'Orders': paginatedOrders,
      };

    } catch (err) {
      console.error(err);
      return err;
    }
  };

  async getOrder(id: string) {
    try {
      const Order = await db("order").where("order_id", id);
      // if (Order.isEmpty()) {
      if (!Order) {
        return;
      }
      return Order;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  async addOrder(req: { body: { Order_id: any; inventory_id: any; store_id: any; quantity: any; status: any; }}) {
    try {
      const data = {
        Order_id: req.body.Order_id,
        inventory_id: req.body.inventory_id,
        store_id: req.body.store_id,
        quantity: req.body.quantity,
        status: req.body.status
      };
      const result = await db('order').insert(data)
        .catch(async function (err) {
          return err;
        })

      // Send new Order in response
      const Order = await this.getOrder(result[0]);
      return Order;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async updateOrder(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    try {
      const data = {
        Order_id: req.body.order_id,
        inventory_id: req.body.inventory_id,
        store_id: req.body.store_id,
        quantity: req.body.quantity,
        status: req.body.status
      };

      const order: any = await this.getOrder(req.params.id);
      if (order == '') {
        return {'status': 'error' , 'message': 'Order not found!'};
      }

      const result = await db('order').update(data).where("order_id", req.params.id)
        .catch(async function (err) {
          return err;
      });

      // Send updated Order in response
      const updatedOrder = await this.getOrder(req.params.id);
      return updatedOrder;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


