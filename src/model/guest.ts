import { psql } from "../connectionConfig"
import { DataTypes } from 'sequelize'


const Guest = psql.define("guest", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nomorTelepon: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    catatan: {
        type: DataTypes.TEXT,
        allowNull: true
    },
})

export default Guest

export type GuestObject = {
    id?: number
    nama?: string
    alamat?: string
    nomorTelepon?: string
    catatan?: string
    updatedAt?: Date
    createdAt?: Date
}