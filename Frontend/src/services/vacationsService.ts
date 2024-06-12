import axios from "axios"
import { VacationsType } from "../models/vacationsModel"
import { appConfig } from "../utils/appConfig"
import { VacationsAction, VacationsActionType, vacationsStore } from "../redux/vacationState"



export const getAllVacationsService = async (): Promise<VacationsType[]> => {
    let vacations = vacationsStore.getState().vacations

    if (vacations.length === 0) {

        const response = await axios.get<VacationsType[]>(appConfig.vacationsUrl)

        vacations = response.data

        const action: VacationsAction = {
            type: VacationsActionType.setVacations,
            payload: vacations
        }
        vacationsStore.dispatch(action)
    }
    return vacations
}

export const getOneVacationService = async (id: number): Promise<VacationsType> => {

    const response = await axios.get<VacationsType>(`${appConfig.vacationsUrl}/${id}`)

    const vacation = response.data

    return vacation
}

export const getImageVacationService = async (image: string): Promise<string> => {

    const response = await axios.get<string>(`${appConfig.vacationImageUrl}/${image}/`)

    const data = response.data
    

    return data
}

export const addVacationService = async (newVacation: VacationsType): Promise<VacationsType> => {
    const option = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await axios.post<VacationsType>(appConfig.vacationsUrl, newVacation, option)

    const data = response.data
    
    const action: VacationsAction = {
        type: VacationsActionType.addVacations,
        payload: data
    }
    vacationsStore.dispatch(action)

    return data
}

export const updateVacationService = async (updatedVacation: VacationsType, vacationId: number): Promise<VacationsType> => {
    const option = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await axios.patch<VacationsType>(`${appConfig.vacationsUrl}/${vacationId}`, updatedVacation, option)

    const data = response.data

    return data
}


export const deleteVacationService = async (id: number): Promise<void> => {

        await axios.delete(`${appConfig.vacationsUrl}/${id}`);

        const action: VacationsAction = {
            type: VacationsActionType.deleteVacations,
            payload: id
        };
        vacationsStore.dispatch(action);
    
}
