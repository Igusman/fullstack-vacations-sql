import express, { Request, Response, NextFunction } from "express";
import { getUserLogic, registerLogic, signinLogic } from "../Logics/authLogic";
import { CredentialType, UserType } from "../Models/AuthModels";
import { verfiyAdminMW } from "../Middleware/verfiyAdmin";



const  router = express.Router()



router.get('/auth', [verfiyAdminMW], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUserLogic()
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.post('/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body as UserType
        const register = await registerLogic(userInfo)
        res.json(register)
    } catch (err) {
        next(err)
    }
})

router.post('/auth/signin', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credential = req.body as CredentialType
        const login = await signinLogic(credential)
        res.status(200).json(login)
    } catch (err) {
        next(err)
    }
})


export default router