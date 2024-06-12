import express, { type NextFunction, type Request, type Response } from 'express'
// import { deleteBookLogic } from '../Logics/vactionLogic'
import { winstonLogger } from '../Utils/logger'

export const deleteMsg = async (req: Request, res: Response, next: NextFunction) => {
  winstonLogger.warn('tring to delete a book')
  next()
}
