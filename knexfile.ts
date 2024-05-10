import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'mysql123',
      database: 'candystore',
      debug: false,
      port: 3307
      // host: process.env.DB_HOST,
      // user: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
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

module.exports = config;
