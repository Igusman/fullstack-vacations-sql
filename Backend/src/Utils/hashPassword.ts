import crypto from 'crypto'


const salt = 'FU'

export const hashPassword =  (password: string) => {

    // if(!password) return null;

    const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex')
    
    return hashedPassword

}


export const tempPassword = async (): Promise<string> => {

    const randomPassword = (Math.random() + 1).toString(36).substring(2)

    return randomPassword
}