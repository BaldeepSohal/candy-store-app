import OrderService from '../src/services/order';
const order = new OrderService;

import request from "supertest";
import app from "../src/index";


describe('GET Orders', () => {
  it('should return the Orders', async () => {
    const result = await order.getOrders({ pageSize: "1", page: "1" });
    expect(result).toMatchObject({
      "Orders": [
          {
              "order_id": 1,
              "status": "received",
              "store_address": "Toronto",
              "inventory_name": "SmartiesBoxTruck",
              "customer_name": "Mark",
              "quantity": 7,
              "created_at": "2024-05-10 02:40:10",
              "updated_at": "2024-05-10 02:40:10"
          }
      ]
  });
  });

  it('should return a order with id', async () => {
    const result = await order.getOrder(1);
    expect(result).toEqual([
      {
          "order_id": 1,
          "status": "received",
          "store_address": "Toronto",
          "inventory_name": "SmartiesBoxTruck",
          "customer_name": "Mark",
          "quantity": 7,
          "created_at": "2024-05-10 02:40:10",
          "updated_at": "2024-05-10 02:40:10"
      }
  ]);
  });


});