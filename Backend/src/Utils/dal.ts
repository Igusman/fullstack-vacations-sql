import mysql from 'mysql'
import { appConfig } from './appConfig'

export const connction = mysql.createPool({
  host: appConfig.host,
  user: appConfig.user,
  password: appConfig.password,
  database: appConfig.database
})

export const mySqlCommand = async (sql: string) => {
  return await new Promise<any>((res, rej) => {
    connction.query(sql, (err, result) => {
      if (err) {
        rej(err)
        return
      }
      res(result)
    })
  })
}
