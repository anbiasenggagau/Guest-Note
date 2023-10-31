import { psql } from "../../connectionConfig";
import Guest from "../guest";
import User from "../user";

Guest
User

const force = process.env.npm_config_force

if (force == "true") {
    psql.sync({ alter: true, force: true, logging: true }).then(() => {
        console.log("Succesfully force migrate all table")
    })
} else {
    psql.sync({ alter: true, logging: true }).then(() => {
        console.log("Succesfully migrate all table")
    })
}