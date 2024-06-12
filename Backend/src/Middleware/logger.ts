import { type NextFunction, type Request, type Response } from 'express'
import { winstonLogger } from '../Utils/logger'

export const loggerReq = (req: Request, res: Response, next: NextFunction) => {
  winstonLogger.info(` Request method: ${req.method}, Request route: ${req.originalUrl} date:${new Date().toLocaleString()}`)
  next()
}
