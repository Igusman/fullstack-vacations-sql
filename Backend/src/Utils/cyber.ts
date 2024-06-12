import jwt from 'jsonwebtoken'
import { type Request } from 'express'
import { UserType } from '../Models/AuthModels'

const secret = 'FU'

interface UserContainer {
  user: UserType
}

export const getNewToken = (user: UserType): string => {
  const container: UserContainer = { user }

  const options = { expiresIn: '3h' }

  const token = jwt.sign(container, secret, options)

  return token
}

export const verfiyToken = async (req: Request): Promise<boolean> => {
  return await new Promise<boolean>((resolve, reject) => {
    try {
      const header = req.header('authorization')

      if (!header) {
        resolve(false)
        return
      }

      const token = header.substring(7)

      if (!token) {
        resolve(false)
        return
      }

      jwt.verify(token, secret, (err) => {
        if (err) {
          resolve(false)
          return
        }

        resolve(true)
      })
    } catch (err) {
      reject(err)
    }
  }
  )
}

export const verifyAdmin = async (req: Request): Promise<boolean> => {
  const isLoggedIn = await verfiyToken(req)

  if (!isLoggedIn) return false

  const header = req.header('authorization')
  const token = header.substring(7)

  const container = jwt.decode(token) as UserContainer

  const user = container.user

  return user.role === 'admin'
}
