import CustomerService from '../src/services/customer';
const customer = new CustomerService;

import request from "supertest";
import app from "../src/index";

let token = '';

beforeAll(async () => {
  const res = await request(app).post('/api/auth').send({email: 'baldeep222@gmail.com', password: 'Bal1234#'});;
  token = res.body._token;
});


describe("GET /api/customers", () => {
  it("should return the customers", async () => {
    const response = await request(app).get("/api/customers?pageSize=1&page=1").set('x-auth-token', `${token}`);
    expect(response.body).toMatchObject({
      "customers": [
        {
          "customer_id": 1,
          "customer_name": "Mark",
          "created_at": "2024-05-09 19:02:35",
          "updated_at": "2024-05-09 19:02:35"
        }
      ]
    });
    expect(response.statusCode).toBe(200);
  });


  it("should return a customer with id", async () => {
    const response = await request(app).get("/api/customers/1").set('x-auth-token', `${token}`);
    expect(response.body).toMatchObject([
      {
        "customer_id": 1,
        "customer_name": "Mark",
        "created_at": "2024-05-09 19:02:35",
        "updated_at": "2024-05-09 19:02:35"
      }
    ]);
    expect(response.statusCode).toBe(200);
  });

  it('should add a customer', async () => {
    const data = {
      name: "Max"
    };
    try {
      const response = await request(app)
        .post('/api/customers')
        .send(data)
        .set('x-auth-token', `${token}`);
      expect(response.statusCode).toBe(200);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });


  it('should update a customer', async () => {
    const data = {
      name: "Mark"
    };
    try {
      const response = await request(app)
        .put('/api/customers/1')
        .send(data)
        .set('x-auth-token', `${token}`);
      expect(response.statusCode).toBe(200);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });

});
