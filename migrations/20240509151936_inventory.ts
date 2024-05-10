import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("inventory", (table) => {
        table.increments("inventory_id").primary();
        table.string("inventory_name").notNullable();
        table.date("manufacture_date").notNullable();
        table.integer("available_quantity").notNullable();
        table.timestamps(true, true);
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("inventory");
}

