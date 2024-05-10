import knex from 'knex';
const config = require('../knexfile.ts');
// const environment = process.env.NODE_ENV || "development";

// export default knex(knexFile[environment]);

export default knex(config.development);