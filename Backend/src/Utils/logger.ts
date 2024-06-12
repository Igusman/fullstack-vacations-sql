// import { fsPromises } from 'fs/promises'
import { createLogger, format, transports } from 'winston'

export const winstonLogger = createLogger({

  level: 'info',

  transports: [

    new transports.File({ filename: 'log.txt', level: 'info' }),
    new transports.Console()
  ],

  format: format.combine(
    format.timestamp(),
    format.printf(logg => `${logg.level}\t${logg.message}\t`)
  )

})

// export const logger = async (msg: string) => {
//   const date = new Date()
//   const line = `\n${date.toDateString()} - ${msg}\n ------ `
//   await fsPromises.appendFile(`./logger.txt`, line)
// } 