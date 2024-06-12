import { v4 as uuid } from 'uuid'
import { winstonLogger } from './logger'

const data = {
    imageFile: {
        name: "photo.jpeg"
    }
}


export const uploadImageFile = async (fullPath: string, data: any) => {

    try {
        const extintion = data.imageFile.name.substring(data.imageFile.name.lastIndexOf('.'))
        data.image = uuid() + extintion
        console.log(data.imageFile)
        console.log(data.imageFile.name)

        await data.imageFile.mv(fullPath + data.image)

        delete data.imageFile

    } catch (err) {
        winstonLogger.error('add image error ' + err)
    }
}


