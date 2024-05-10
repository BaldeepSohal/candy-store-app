import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("customers", (table) => {
        table.increments("customer_id").primary();
        table.string("customer_name").notNullable();
        table.timestamps(true, true);
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("customers");
}

