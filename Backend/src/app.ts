import express from 'express'
import { appConfig } from './Utils/appConfig'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { catchAll } from './Middleware/catchAll'
import { routeNotFound } from './Middleware/routeNotFound'
import { loggerReq } from './Middleware/logger'
import vacationController from './Controllers/vacationController'
import followController from './Controllers/followController'
import authController from './Controllers/authControllers'


const server = express();

server.use(express.json())
server.use(cors())
server.use(fileUpload())

server.use(loggerReq)

server.use('/api', authController)
server.use('/api', vacationController)
server.use('/api', followController)


server.use('*', routeNotFound)

server.use(catchAll)

server.listen(appConfig.port, () => { console.log(`Listening on http://${appConfig.host}:${appConfig.port}`) })
