import express, { type NextFunction, type Request, type Response } from 'express'
import { verifyAdmin } from '../Utils/cyber'
import { unauthorizedError } from '../Models/ErrorModels'

export const verfiyAdminMW = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin = await verifyAdmin(req)
    if (!isAdmin) return unauthorizedError('UNAUTHRORIZED!')
    next()
  } catch (err) {
    next(err)
  }
}
