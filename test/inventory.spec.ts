import InventoryService from '../src/services/inventory';
const inventory = new InventoryService;


describe('GET Inventories', () => {
  it('should return the inventory', async () => {
    const result = await inventory.getInventories({ pageSize: "1", page: "1" });
    expect(result).toMatchObject({

      "inventories": [
          {
              "inventory_id": 1,
              "inventory_name": "SmartiesBoxTruck",
              "manufacture_date": "2022-01-01",
              "available_quantity": 10,
              "created_at": "2024-05-10 00:52:48",
              "updated_at": "2024-05-10 00:52:48"
          }
      ]
  });
  });

  it('should return a inventory with id', async () => {
    const result = await inventory.getInventory(1);
    expect(result).toEqual([
      {
          "inventory_id": 1,
          "inventory_name": "SmartiesBoxTruck",
          "manufacture_date": "2022-01-01",
          "available_quantity": 10,
          "created_at": "2024-05-10 00:52:48",
          "updated_at": "2024-05-10 00:52:48"
      }
  ]);
  });


});