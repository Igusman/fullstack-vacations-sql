import { Request, Response, NextFunction } from 'express'

export interface errorType {
  message: string
  status: number
}

export const routeNotFoundError = (route: string) => {
  const errorObj: errorType = { message: ` ${route} not found `, status: 404 }
  throw errorObj
}
export const ResourceNotFoundError = (id: any) => {
  const errorObj: errorType = { message: `${id} not found `, status: 404 }
  throw errorObj
}

export const unauthorizedError = (message: string) => {
  const errorObj: errorType = { message: `${message} `, status: 401 }
  throw errorObj
}

export const BodyValidtionError = (message: string) => {
  const errorObj: errorType = { message, status: 401 }
  throw errorObj
}
