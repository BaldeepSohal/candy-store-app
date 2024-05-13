import reportService from '../src/services/report';
const report = new reportService;


describe('GET Report', () => {
  it('should return monthly report', async () => {
    const result = await report.getReport({ from: '2024-01-01' , to: '2024-05-12', pageSize: '4', page: '1' });
    expect(result).toMatchObject({
      "Orders": [
          {
              "order_count": 1,
              "status": "received",
              "store_id": 1,
              "store_address": "Toronto, CA"
          },
          {
              "order_count": 2,
              "status": "received",
              "store_id": 2,
              "store_address": "Montreal"
          },
          {
              "order_count": 1,
              "status": "in progress",
              "store_id": 3,
              "store_address": "New York"
          },
          {
              "order_count": 1,
              "status": "processed",
              "store_id": 4,
              "store_address": "Vancouver"
          }
      ]
  });
  });


});