import Guest, { GuestObject } from "../../model/guest";
import { RequestBody } from "./request";
import { ServiceError } from "./response";
import validator from 'validator'

interface Service {
    admin(): Promise<ServiceError | GuestObject[]>,
    getNotes(): Promise<ServiceError | Pick<GuestObject, "nama" | "catatan">[]>,
    create(body: RequestBody): Promise<ServiceError>
}

const guestService: Service = {
    admin,
    getNotes,
    create,
}

export default guestService

async function create(body: RequestBody): Promise<ServiceError> {
    try {
        if (!validator.isMobilePhone(body.nomorTelepon!, 'id-ID')) throw new Error("Phone Number is not right")
        await Guest.create(body)
        return {}
    } catch (error: any) {
        return {
            message: error.message,
            stack: error.stack
        }
    }
}

async function admin(): Promise<ServiceError | GuestObject[]> {
    try {
        const users = await Guest.findAll()
        return users.map(value => value.dataValues)
    } catch (error: any) {
        return {
            message: error.message,
            stack: error.stack
        }
    }
}

async function getNotes(): Promise<ServiceError | Pick<GuestObject, "nama" | "catatan">[]> {
    try {
        const users = await Guest.findAll()
        return users.map(value => {
            return {
                nama: value.dataValues.nama,
                catatan: value.dataValues.catatan
            }
        })
    } catch (error: any) {
        return {
            message: error.message,
            stack: error.stack
        }
    }
}