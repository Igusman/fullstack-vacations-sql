import { v4 as uuid, v4 } from 'uuid'
import { OkPacket } from 'mysql'
import { mySqlCommand } from '../Utils/dal'
import { safeDelete } from '../Utils/safeDelete'
import { VacationsType, patchVacationsValidtion, vacationValidtion } from '../Models/vacationsModels'
import { BodyValidtionError, ResourceNotFoundError } from '../Models/ErrorModels'
import { uploadImageFile } from '../Utils/uploadFile'

export const getAllVactionsLogic = async (): Promise<VacationsType[]> => {
  const sqlCommand = 'SELECT * FROM vacations'

  const getAllVactions = await mySqlCommand(sqlCommand) as VacationsType[]

  return getAllVactions
}

export const getVactionLogic = async (id: number): Promise<VacationsType> => {

  const sqlCommand = `SELECT * FROM vacations WHERE vacationId = '${id}'`

  const getOneVaction = await mySqlCommand(sqlCommand) as VacationsType

  const vaction = getOneVaction[0]

  if (!vaction) ResourceNotFoundError(id)

  return vaction
}

export const getVactionByNameLogic = async (destination: string): Promise<VacationsType> => {

  const sqlCommand = `SELECT * FROM vacations WHERE destination = '${destination}'`

  const getOneVaction = await mySqlCommand(sqlCommand) as VacationsType

  const vaction = getOneVaction[0]

  if (!vaction) ResourceNotFoundError(vaction)

  return vaction
}


export const newVactionLogic = async (newVaction: VacationsType): Promise<VacationsType> => {
  vacationValidtion(newVaction)

  if (newVaction.imageFile) {

    uploadImageFile('./src/assets/vacationImages/', newVaction)
  }

  const sqlCommand = `INSERT INTO vacations ( vacationId , destination, description,startDate, endDate, price, image) 
    VALUE ( NULL, '${newVaction.destination}' , '${newVaction.description}' , '${newVaction.startDate}', '${newVaction.endDate}' , ${newVaction.price}, '${newVaction.image}' ) `

  const info: OkPacket = await mySqlCommand(sqlCommand)

  newVaction.vacationId = +info.insertId

  return newVaction
}

export const putVactionLogic = async (updatedVaction: VacationsType, id: number): Promise<VacationsType> => {
  vacationValidtion(updatedVaction)

  const getVaction = await getVactionLogic(id)

  if (updatedVaction.imageFile) {
    safeDelete('./src/assets/vacationImages/' + getVaction.image)

    uploadImageFile('./src/assets/vacationImages/', updatedVaction)
  }

  const sqlCommand = `UPDATE vacations SET destination = '${updatedVaction.destination}',  description = '${updatedVaction.description}' , price = ${updatedVaction.price} , startDate = '${updatedVaction.startDate}', endDate = '${updatedVaction.endDate}' , image = '${updatedVaction.image}' WHERE vacationId = ${id}`

  const info: OkPacket = await mySqlCommand(sqlCommand)

  if (!info.affectedRows) BodyValidtionError(info.message)

  return updatedVaction
}


export const patchVactionLogic = async (updatedVaction: VacationsType, id: number): Promise<VacationsType> => {
  patchVacationsValidtion(updatedVaction)

  const getVaction = await getVactionLogic(id)

  if (updatedVaction.imageFile) {
    safeDelete('./src/assets/vacationImages/' + getVaction.image)

    await uploadImageFile('./src/assets/vacationImages/', updatedVaction)
  }


  let patchedVaction = { ...getVaction, ...updatedVaction }

  const sqlCommand = `UPDATE vacations SET destination = '${patchedVaction.destination}',  description = '${patchedVaction.description}' , price = ${patchedVaction.price}, image = '${patchedVaction.image}' , startDate = '${patchedVaction.startDate}', endDate = '${patchedVaction.endDate}' WHERE vacationId = ${id}`

  const info: OkPacket = await mySqlCommand(sqlCommand)

  if (!info.affectedRows) return ResourceNotFoundError(updatedVaction)

  return patchedVaction
}

export const deleteVactionLogic = async (id: number): Promise<void> => {

  const fetchImage = await getVactionLogic(id)

  const sqlCommand = `DELETE FROM vacations WHERE vacationId = ${id}`

  const info: OkPacket = await mySqlCommand(sqlCommand)

  if(!info.affectedRows) {'vacation didnt deleted'}

  safeDelete('./src/assets/vacationImages/' + fetchImage.image)

  if (!info.affectedRows) { ResourceNotFoundError(info.message) }
}
