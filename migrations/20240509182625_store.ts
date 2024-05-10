import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("store", (table) => {
        table.increments("store_id").primary();
        table.string("store_address").notNullable();
        table.string("store_manager_name").notNullable();
        table.timestamps(true, true);
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("store");
}

