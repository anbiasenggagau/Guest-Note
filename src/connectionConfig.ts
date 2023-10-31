import { Sequelize } from "sequelize"
import { DB_PORT, DB_NAME, DB_USER, DB_PASS, DB_HOST } from "./config"


export const psql: Sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})