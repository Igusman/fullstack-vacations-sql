import { type NextFunction, type Request, type Response } from 'express'
import { routeNotFoundError } from '../Models/ErrorModels'

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = routeNotFoundError(req.originalUrl)
  next(err)
}
