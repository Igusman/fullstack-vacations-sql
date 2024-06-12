import fs from 'fs'
import { winstonLogger } from './logger';

export const safeDelete = (fullPath) => {
  try {
    if (!fullPath || !fs.existsSync(fullPath)) return;

    fs.unlinkSync(fullPath)
  } catch (err) {
    console.log('delete error ' + err)
    winstonLogger.error('delete error ' + err)
  }
}
