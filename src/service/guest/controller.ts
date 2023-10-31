import express from 'express'
import { Response, ServiceError } from './response'
import guestService from './service'
import { RequestBody } from './request'
import { TokenPayload } from '../../middleware/auth'

interface Controller {
    admin(req: express.Request<any, any, any>, res: express.Response): void
    createOne(req: express.Request<any, any, any>, res: express.Response): void
    getNotes(req: express.Request<any, any, any>, res: express.Response): void
}

const guestController: Controller = {
    admin,
    createOne,
    getNotes,
}

const route = express.Router()

route.get("/admin", guestController.admin)
route.get("/", guestController.getNotes)
route.post("/", guestController.createOne)

export default route

async function createOne(req: express.Request<any, any, any>, res: express.Response) {
    const body: RequestBody = req.body
    const response: Response = {
        message: '',
        status: ''
    }
    const error = await guestService.create(body)

    if (error.message) {
        response.status = "Bad Request"
        response.message = error.message!

        return res.status(400).json(response)
    }

    response.status = "Created"
    response.message = "Succcess"
    return res.status(201).json(response)
}

async function admin(req: express.Request<any, any, any>, res: express.Response) {
    const user: TokenPayload = req.user
    const response: Response = {
        message: '',
        status: ''
    }

    if (user.role.toLowerCase() != "admin") return res.sendStatus(403)

    const result = await guestService.admin()

    if ((result as ServiceError).message) {
        response.status = "Bad Request"
        response.message = (result as ServiceError).message!

        return res.status(400).json(response)
    }

    response.status = "OK"
    response.message = "Succcess"
    response.data = result
    return res.status(200).json(response)
}

async function getNotes(req: express.Request<any, any, any>, res: express.Response) {
    const response: Response = {
        message: '',
        status: ''
    }

    const result = await guestService.getNotes()

    if ((result as ServiceError).message) {
        response.status = "Bad Request"
        response.message = (result as ServiceError).message!

        return res.status(400).json(response)
    }

    response.status = "OK"
    response.message = "Succcess"
    response.data = result
    return res.status(200).json(response)
}