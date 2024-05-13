import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";
import { Request, Response } from "express";
import { IOrder } from '../models/order';
import Inventory from '../services/inventory'
const inventoryService = new Inventory();

/**
 * OrderService
 */
export default class OrderService {

  /**
	 * getOrders
	 *
	 * @param {Object} query
	 * @return {Object}
	 */
  async getOrders(query: { page: string; pageSize: string; } = {
    page: "",
    pageSize: ""
  }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalOrders = await db("order");
      const totalPages = Math.ceil(totalOrders.length / pageSize);

      const paginatedOrders = await db("order")
      .select(db.raw('order.order_id, order.status, store.store_address AS store_address, inventory.inventory_name AS inventory_name, customers.customer_name AS customer_name, order.quantity AS quantity, DATE_FORMAT(order.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(order.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .join('store', 'order.store_id', '=', 'store.store_id')
      .join('inventory', 'order.inventory_id', '=', 'inventory.inventory_id')
      .join('customers', 'order.customer_id', '=', 'customers.customer_id')
      .limit(pageSize).offset(offset);

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

  /**
	 * getOrder
	 *
	 * @param {number} id
	 * @return {Object}
	 */
  async getOrder(id: number) {
    try {
      const Order = await db("order")
      .select(db.raw('order.order_id, order.status, store.store_address AS store_address, inventory.inventory_name AS inventory_name, customers.customer_name AS customer_name, order.quantity AS quantity, DATE_FORMAT(order.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(order.updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at'))
      .join('store', 'order.store_id', '=', 'store.store_id')
      .join('inventory', 'order.inventory_id', '=', 'inventory.inventory_id')
      .join('customers', 'order.customer_id', '=', 'customers.customer_id')
      .where("order.order_id", id);

      if (!Order) {
        return { 'status': 'error', 'message': 'Order not found!' };
      }
      return Order;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  /**
	 * addOrder
	 *
	 * @param {IOrder} data
	 * @return {Object}
	 */
  async addOrder(data: IOrder) {
    try {

      // check if order quantity exceeds inventory available and update quantity
      this.updateQuantity(data);

      // update order
      const newOrder = await db('order').insert(data)
      .catch(async function (err) {
        return err;
      });

      // Send new Order in response
      const order = await this.getOrder(newOrder[0]);
      return order;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

  /**
	 * updateOrder
	 *
	 * @param {IOrder} data
	 * @param {number} id
	 * @return {Object}
	 */
  async updateOrder(data: IOrder, id: number) {
    try {

      const order: any = await this.getOrder(id);
      if (order == '') {
        return { 'status': 'error', 'message': 'Order not found!' };
      }

      // check if order quantity exceeds inventory available and update quantity
      await this.updateQuantity(data, order[0].quantity);

      const result = await db('order').update(data).where("order_id", id)
        .catch(async function (err) {
          return err;
        });

      // Send updated Order in response
      const updatedOrder = await this.getOrder(id);
      return updatedOrder;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

  /**
	 * updateQuantity
	 *
	 * @param {IOrder} data
	 * @param {string} orderQuantity
	 * @return {JSON}
	 */
  async updateQuantity(data: IOrder, orderQuantity: string = '') {
    try {
      const inventory = await inventoryService.getInventory(data.inventory_id);

      if(!inventory){
        return { 'status': 'error', 'message': 'Inventory not found!' };
      }

      let inventoryCount = inventory[0].available_quantity;
      
      if(orderQuantity){
        // if updating quantity, reset inventory count to update new order quantity
        inventoryCount = parseInt(inventory[0].available_quantity) + parseInt(orderQuantity);

        const result = await db('inventory').update({available_quantity: inventoryCount}).where("inventory_id", data.inventory_id)
        .catch(async function (err) {
          return err;
        });
      
      }

      if (inventoryCount < data.quantity) {
        return { 'status': 'error', 'message': 'Order quantity is higher than available inventory items!' };
      }

      // update inventory count
      const newQuantity = parseInt(inventoryCount) - data.quantity;
      await db('inventory').update({ available_quantity: newQuantity }).where("inventory_id", data.inventory_id)
      .catch(async function (err) {
        return err;
      });
      
    }catch (err) {
      console.error(err);
      return err;
    }
  }
}


