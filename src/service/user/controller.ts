import express from 'express'
import { Response, ServiceError } from './response'
import userService from './service'
import { RequestBody } from './request'

interface Controller {
    getAll(req: express.Request<any, any, any>, res: express.Response): void
    createOne(req: express.Request<any, any, any>, res: express.Response): void
    login(req: express.Request<any, any, any>, res: express.Response): void
}

const userController: Controller = {
    getAll,
    createOne,
    login
}

const route = express.Router()

route.get("/", userController.getAll)
route.post("/", userController.createOne)
route.post("/login", userController.login)

export default route

async function login(req: express.Request<any, any, any>, res: express.Response) {
    const body: RequestBody = req.body
    const response: Response = {
        message: '',
        status: ''
    }

    const result = await userService.login(body)

    if ((result as ServiceError).message) {
        response.status = "Bad Request"
        response.message = (result as ServiceError).message!

        return res.status(400).json(response)
    }

    response.status = "OK"
    response.message = "Succcess"
    response.data = {
        token: result
    }
    return res.status(200).json(response)
}

async function createOne(req: express.Request<any, any, any>, res: express.Response) {
    const body: RequestBody = req.body
    const response: Response = {
        message: '',
        status: ''
    }
    const error = await userService.create(body)

    if (error.message) {
        response.status = "Bad Request"
        response.message = error.message!

        return res.status(400).json(response)
    }

    response.status = "Created"
    response.message = "Succcess"
    return res.status(201).json(response)
}

async function getAll(req: express.Request<any, any, any>, res: express.Response) {
    const response: Response = {
        message: '',
        status: ''
    }

    const result = await userService.all()

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