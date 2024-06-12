import Joi from 'joi'
import { UploadedFile } from 'express-fileupload'
import { BodyValidtionError } from './ErrorModels'

export type VacationsType = {
  vacationId: number
  destination: string
  description: string
  startDate: Date
  endDate: Date
  price: number
  image: string
  imageFile: UploadedFile
}

export const vacationsSchemaValidtion = Joi.object({
  vacationId: Joi.number().integer().forbidden(),
  destination: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(5).max(300).optional(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  price: Joi.number().required().min(10).max(30000).integer().positive(),
  image: Joi.string().min(2).max(110).optional(),
  imageFile: Joi.object().optional()
})

export const vacationValidtion = (vacation: VacationsType) => {
  const result = vacationsSchemaValidtion.validate(vacation)
  if (result.error) BodyValidtionError(result.error.message)
}

export const patchVacationsSchemaValidtion = Joi.object({
  destination: Joi.string().min(2).max(50).optional(),
  description: Joi.string().min(2).max(200).optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional(),
  price: Joi.number().min(10).max(3000).optional().integer().positive(),
  image: Joi.string().min(2).max(110).optional(),
  imageFile: Joi.object().optional()
})

export const patchVacationsValidtion = (vacation: VacationsType) => {
  const result = patchVacationsSchemaValidtion.validate(vacation, {
    // Specify the date format option
    dateFormat: 'iso',
  })
  if (result.error) BodyValidtionError(result.error.message)
}
