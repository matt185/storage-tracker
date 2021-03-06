require('dotenv').config();
const knex = require('knex');

const db = knex({
    client: "pg",
    connection: process.env.URL || `postgres://${process.env.DB_USER}@127.0.0.1:5432/${process.env.DB_NAME}`,
    searchPath: "public",
    migrations: {
        tableName: "knex_migrations",
        directory: "./util/db/migrations"
        
    }
});

module.exports = db;
