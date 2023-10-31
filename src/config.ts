require("dotenv").config()

const SERVER_PORT = process.env.SERVER_PORT ?? 3000
const DB_PORT = process.env.DB_PORT ?? 5432
const DB_NAME = process.env.DB_NAME ?? "dev"
const DB_USER = process.env.DB_USER ?? "postgres"
const DB_PASS = process.env.DB_PASS ?? "supersecret"
const DB_HOST = process.env.DB_HOST ?? "localhost"
const JWT_KEY = process.env.JWT_KEY

export {
    SERVER_PORT,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST,
    JWT_KEY
}