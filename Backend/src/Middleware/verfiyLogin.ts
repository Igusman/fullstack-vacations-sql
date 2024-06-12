import express, { type NextFunction, type Request, type Response } from 'express'
import { verfiyToken } from '../Utils/cyber'
import { unauthorizedError } from '../Models/ErrorModels'

export const verfiyLoginMW = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isValid = await verfiyToken(req)
    if (!isValid) return unauthorizedError('Invalid token!')
    next()
  } catch (err) {
    next(err)
  }
}
