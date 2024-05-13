import storeService from '../src/services/store';
const store = new storeService;

import request from "supertest";
import app from "../src/index";


describe('GET Store', () => {
  it('should return the Store', async () => {
    const result = await store.getStores({ pageSize: "1", page: "1" });
    expect(result).toMatchObject({
      "stores": [
          {
              "store_id": 1,
              "store_address": "Toronto",
              "store_manager_name": "Baldeep Kaur",
              "created_at": "2024-05-10 02:07:16",
              "updated_at": "2024-05-10 02:07:16"
          }
      ]
  });
  });

  it('should return a store with id', async () => {
    const result = await store.getStore(1);
    expect(result).toEqual([
      {
          "store_id": 1,
          "store_address": "Toronto",
          "store_manager_name": "Baldeep Kaur",
          "created_at": "2024-05-10 02:07:16",
          "updated_at": "2024-05-10 02:07:16"
      }
  ]);
  });


});