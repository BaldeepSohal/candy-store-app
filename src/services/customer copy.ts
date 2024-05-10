import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import db from "../../db/db-config";
import { Request, Response } from "express";

export default class Reportervice {

  async getReport(query: { page: string; pageSize: string; }) {
    try {
      const page = parseInt(query.page);
      const pageSize = parseInt(query.pageSize);
      const offset = (page - 1) * pageSize;

      const totalReport = await db("order");
      const totalPages = Math.ceil(totalReport.length / pageSize);

      const paginatedReport = await db("order").limit(pageSize).offset(offset);

      return {
        'page': page,
        'per_page': pageSize,
        'page_count': totalPages,
        'total': totalReport.length,
        'Report': paginatedReport,
      };

    } catch (err) {
      console.error(err);
      return err;
    }
  };

}