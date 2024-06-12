import express, { Request, Response, NextFunction } from 'express'
import { addFollowLogic, getFollowByUserLogic, getAllFollowByVactionLogic, getAllFollowersLogic, getAllFollowersCsvLogic } from '../Logics/followLogic'
import { FollowType } from '../Models/followModels'
import { json2csv } from 'json-2-csv'
import { verfiyAdminMW } from '../Middleware/verfiyAdmin'



const router = express.Router()


router.get('/follows', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getAllFollowers = await getAllFollowersLogic()
        res.json(getAllFollowers)
    } catch (err) {
        next(err)
    }
})

router.get('/follows/csv', verfiyAdminMW, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getAllFollowers = await getAllFollowersCsvLogic()
        const csv = json2csv(getAllFollowers)
        res.setHeader('content-type', 'text/csv').send(csv)
    } catch (err) {
        next(err)
    }
})

router.get('/follows/userId/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.userId
        const getFollowersByUser = await getFollowByUserLogic(id)
        res.json(getFollowersByUser)
    } catch (err) {
        next(err)
    }
})

router.get('/follows/:vacationId([0-9]+)', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.vacationId
        const getAllFollowersByVaction = await getAllFollowByVactionLogic(id)
        res.json(getAllFollowersByVaction)
    } catch (err) {
        next(err)
    }
})

router.post('/follows', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as FollowType
        const addVaction = await addFollowLogic(body)
        res.status(200).send(addVaction)
    } catch (err) {
        next(err)
    }
})



export default router