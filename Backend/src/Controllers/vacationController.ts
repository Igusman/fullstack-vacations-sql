import express, { Request, Response, NextFunction } from 'express'
import { VacationsType } from '../Models/vacationsModels'
import { deleteMsg } from '../Middleware/deleteMsg'
import { verfiyLoginMW } from '../Middleware/verfiyLogin'
import { verfiyAdminMW } from '../Middleware/verfiyAdmin'
import { deleteVactionLogic, getAllVactionsLogic, getVactionByNameLogic, getVactionLogic, newVactionLogic, patchVactionLogic, putVactionLogic } from '../Logics/vactionLogic'
import path from 'path'

const router = express.Router()

router.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllVactions = await getAllVactionsLogic()
    res.json(getAllVactions)
  } catch (err) {
    next(err)
  }
})

router.get('/vacations/:vacationId([0-9]+)', verfiyLoginMW, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.vacationId
    const getOneVaction = await getVactionLogic(id)
    res.json(getOneVaction)
  } catch (err) {
    next(err)
  }
})

router.get('/vacations/:destination', verfiyLoginMW, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.destination
    const getOneVaction = await getVactionByNameLogic(name)
    res.json(getOneVaction)
  }
  catch (err) {
    next(err)
  }
})

router.get('/vacations/image/:image', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageName = req.params.image
    const absoultePath = path.join(__dirname, '..', 'assets/vacationImages', imageName)
    res.sendFile(absoultePath)
  } catch (err) {
    next(err)
  }
})

router.post('/vacations', verfiyAdminMW, async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.imageFile = req.files?.imageFile
    const newVaction = req.body as VacationsType
    const Addedvaction = await newVactionLogic(newVaction)
    res.status(201).json(Addedvaction)
  } catch (err) {
    next(err)
  }
})

router.put('/vacations/:vacationId([0-9]+)', [verfiyAdminMW], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.vacationId
    req.body.imageFile = req.files?.imageFile
    const modifedVaction = await putVactionLogic(req.body, id)
    res.json(modifedVaction)
  } catch (err) {
    next(err)
  }
})

router.patch('/vacations/:vacationId([0-9]+)', verfiyAdminMW, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.vacationId
    req.body.imageFile = req.files?.imageFile
    const ModefyBook = await patchVactionLogic(req.body, id)
    res.json(ModefyBook)
  } catch (err) {
    next(err)
  }
})

router.delete('/vacations/:vacationId([0-9]+)', [verfiyAdminMW, deleteMsg], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.vacationId
    await deleteVactionLogic(id)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

export default router
