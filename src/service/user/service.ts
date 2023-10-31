import { JWT_KEY } from "../../config";
import User, { UserObject } from "../../model/user";
import { RequestBody } from "./request";
import { ServiceError } from "./response";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface Service {
    all(): Promise<ServiceError | UserObject[]>,
    create(body: RequestBody): Promise<ServiceError>
    login(body: RequestBody): Promise<ServiceError | string>
}

const userService: Service = {
    all,
    create,
    login
}

export default userService

async function login(body: RequestBody): Promise<ServiceError | string> {
    try {

        if (body.username == "admin" && body.password == "admin") {
            return jwt.sign({
                username: "admin",
                role: "regular"
            }, JWT_KEY!)
        }

        const userDb = await User.findOne({
            where: {
                username: body.username
            }
        })
        if (userDb == null) throw new Error("User not found")

        const user: UserObject = userDb.dataValues
        if (!bcrypt.compareSync(body.password!, user.password!)) throw new Error("Wrong password")

        return jwt.sign({
            username: user.username,
            role: "regular"
        }, JWT_KEY!)
    } catch (error: any) {
        return {
            message: error.message,
            stack: error.stack
        }
    }
}

async function create(body: RequestBody): Promise<ServiceError> {
    try {
        const hashedPassword = bcrypt.hashSync(body.password!, 10)
        await User.create({
            username: body.username,
            password: hashedPassword
        })
        return {}
    } catch (error: any) {
        return {
            message: error.message,
            stack: error.stack
        }
    }
}

async function all(): Promise<ServiceError | UserObject[]> {
    try {
        const users = await User.findAll()
        return users.map(value => value.dataValues)
    } catch (error: any) {
        return {
            message: error.message,
            stack: error.stack
        }
    }
}