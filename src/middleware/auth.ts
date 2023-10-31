import express from "express"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config"

export interface TokenPayload {
    username: string,
    role: string
}

export function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, JWT_KEY!, async (err, user) => {
        if (err) return res.sendStatus(403)
        const payload: TokenPayload = user as any
        req.user = payload

        next()
    })
}