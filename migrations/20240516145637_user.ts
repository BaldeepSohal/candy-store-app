import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("user");
}

