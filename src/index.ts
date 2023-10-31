import express from 'express'
import { SERVER_PORT } from './config'
import guestRoute from './service/guest/controller'
import userRoute from './service/user/controller'
import { authenticate } from './middleware/auth'

const app = express()
app.use(express.json({
    limit: "5mb"
}))
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/guest", authenticate, guestRoute)
app.use("/api/v1/user", authenticate, userRoute)


app.listen(SERVER_PORT, () => {
    console.log(`listen to port ${SERVER_PORT}`)
})