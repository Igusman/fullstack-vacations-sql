import { NextFunction, Request, Response } from 'express'
import { winstonLogger } from '../Utils/logger'

export const catchAll = (err: any, req: Request, res: Response, next: NextFunction) => {
  winstonLogger.error(err)
  res.status(err.status).send(err.message)
}

