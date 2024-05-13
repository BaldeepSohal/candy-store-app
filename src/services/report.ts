import db from "../../db/db-config";

/**
	 * Reports Service
	 *
	 */
export default class reportService {

  /**
	 * getReport
	 *
	 * @param {Object} query
	 * @return {Object}
	 */
  async getReport(query: {
      to: any;
      from: any; page: string; pageSize: string; 
} = {
  to: undefined,
  from: undefined,
  page: "",
  pageSize: ""
}) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;
      const from = query.from || '';
      const to = query.to || '';

      const totalOrders = await db("order").join('store', 'order.store_id', '=', 'store.store_id').groupBy(db.raw('order.status, order.store_id'))
      .modify(function(queryBuilder) {
        if (from && to) {
          queryBuilder.whereRaw(`DATE(order.created_at) BETWEEN '${from}' AND '${to}'`)
        }
      })  
      
      const totalPages = Math.ceil(totalOrders.length / pageSize);

      const paginatedOrders = await db("order")
      .select(db.raw('count(order_id) AS order_count, status, order.store_id, store.store_address AS store_address'))
      .join('store', 'order.store_id', '=', 'store.store_id')
      .groupBy(db.raw('order.status, order.store_id'))
      .limit(pageSize).offset(offset)
      .modify(function(queryBuilder) {
        if (from && to) {
          queryBuilder.whereRaw(`DATE(order.created_at) BETWEEN '${from}' AND '${to}'`)
        }
      });

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
}


