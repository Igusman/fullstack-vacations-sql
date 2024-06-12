import Joi from 'joi'
import { BodyValidtionError } from './ErrorModels'

export type roleType = 'admin' | 'User'

export type UserType = {
  userId: string
  firstName: string
  lastName: string
  password: string
  email: string
  role: string
}

export type CredentialType = {
  email: string
  password: string
}

export const userSchema = Joi.object({
  firstName: Joi.string().min(4).max(40).required(),
  lastName: Joi.string().min(4).max(40).required(),
  password: Joi.string().min(4).max(40).required(),
  email: Joi.string().min(4).max(40).email().required(),
})

export const credentialSchema = Joi.object({
  email: Joi.string().min(4).max(40).required(),
  password: Joi.string().min(4).max(40).required()
})

export const userValidtion = (user: UserType) => {
  const userValidateSchema = userSchema.validate(user)
  if (userValidateSchema.error) BodyValidtionError(userValidateSchema.error.message)
}

export const credentialValidtion = (credential: CredentialType) => {
  const credentialValidateSchema = credentialSchema.validate(credential)
  if (credentialValidateSchema.error) BodyValidtionError(credentialValidateSchema.error.message)
}
