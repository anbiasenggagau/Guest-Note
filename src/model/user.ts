import { psql } from "../connectionConfig"
import { DataTypes } from 'sequelize'


const User = psql.define("user", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
})

export default User

export type UserObject = {
    id?: number
    username?: string
    password?: string
    updatedAt?: Date
    createdAt?: Date
}