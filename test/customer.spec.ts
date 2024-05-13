import CustomerService from '../src/services/customer';
const customer = new CustomerService;


describe('Customers APIs', () => {
  it('should return the customers', async () => {
    const result = await customer.getCustomers({ pageSize: "1", page: "1" });
    expect(result).toMatchObject({
      "customers": [
        {
          "customer_id": 1,
          "customer_name": "Mark",
          "created_at": "2024-05-09 19:02:35",
          "updated_at": "2024-05-09 19:02:35"
        }
      ]
    });
  });

  it('should return a customer with id', async () => {
    const result = await customer.getCustomer(1);
    expect(result).toEqual([
      {
          "customer_id": 1,
          "customer_name": "Mark",
          "created_at": "2024-05-09 19:02:35",
          "updated_at": "2024-05-09 19:02:35"
      }
  ]);
  });

});
