export type appConfigType = {
  host: string
  user: string
  password: string
  database: string
  port: number
}

export const appConfig: appConfigType = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vacations_store',
  port: 3010
}
