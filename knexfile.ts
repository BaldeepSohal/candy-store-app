import type { Knex } from "knex";

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      debug: false,
      port: 3307,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "UTC",
    },
    migrations: {
      directory: "./migrations",
    }
  },

  staging: {
  },

  production: {
    client: "mysql",
    connection: {
      debug: true,
      port: 3307,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "UTC",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations",
    }
  }

};

