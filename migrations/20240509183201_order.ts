import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("order", (table) => {
        table.increments("order_id").primary();
        table.integer("customer_id").notNullable();
        table.integer("inventory_id").notNullable();
        table.integer("store_id").notNullable();
        // table.foreign('customer_id').references('customers.customer_id');
        // table.foreign('inventory_id').references('inventory.inventory_id');
        // table.foreign('store_id').references('store.store_id');
        table.integer("quantity").notNullable();
        table.string("status").notNullable();
        table.timestamps(true, true);
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("order");
}

