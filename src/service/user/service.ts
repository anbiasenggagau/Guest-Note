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
        // Create JWT token admin if login as admin
        if (body.username == "admin" && body.password == "admin") {
            return jwt.sign({
                username: "admin",
                role: "admin"
            }, JWT_KEY!, { expiresIn: "1h" })
        }

        const userDb = await User.findOne({
            where: {
                username: body.username
            }
        })
        if (userDb == null) throw new Error("User not found")

        const user: UserObject = userDb.dataValues
        if (!bcrypt.compareSync(body.password!, user.password!)) throw new Error("Wrong password")

        // Generate JWT Token
        return jwt.sign({
            username: user.username,
            role: "regular"
        }, JWT_KEY!, { expiresIn: "1h" })
    } catch (error: any) {
        return {
            message: error.message,
            stack: error.stack
        }
    }
}

async function create(body: RequestBody): Promise<ServiceError> {
    try {
        // hash the password before save to database
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