import { v4 } from 'uuid';
import { CredentialType, UserType, userValidtion } from "../Models/AuthModels";
import { BodyValidtionError, unauthorizedError } from "../Models/ErrorModels";
import { getNewToken } from "../Utils/cyber";
import { mySqlCommand } from "../Utils/dal";
import { hashPassword } from '../Utils/hashPassword';
import { credentialValidtion } from "../Models/AuthModels"
import { OkPacket } from 'mysql';


export const getUserLogic = async (): Promise<UserType[]> => {

    const sqlCommand = `SELECT *  FROM users`

    const users = await mySqlCommand(sqlCommand) as UserType[]

    return users
}

export const registerLogic = async (newUser: UserType): Promise<string> => {

    userValidtion(newUser)

    const checkIfTakken = `SELECT * FROM users WHERE email = '${newUser.email}' `

    const users = await mySqlCommand(checkIfTakken)

    if (users.length >= 1) BodyValidtionError(`'${newUser.email}' already taken`)

    const sqlCommand = `INSERT INTO users (userId,
        firstName,
        lastName,
        password,
        email,
        role) VALUES ('${v4()}','${newUser.firstName}','${newUser.lastName}','${hashPassword(newUser.password)}','${newUser.email}','user')`

    const info: OkPacket = await mySqlCommand(sqlCommand)

    if (!info.affectedRows) BodyValidtionError(info.message)

    const token = getNewToken(newUser)

    return token
}

export const signinLogic = async (credential: CredentialType): Promise<string> => {
    credentialValidtion(credential)
    const sqlCommand = `SELECT * FROM users WHERE email = '${credential.email}' AND password = '${hashPassword(credential.password)}'`

    const users = await mySqlCommand(sqlCommand)

    const user = users[0]

    if (!user) unauthorizedError('incorrect username or password')

    const token = getNewToken(user)

    return token
}