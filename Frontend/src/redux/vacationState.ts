import { createStore } from 'redux';
import { VacationsType } from "../models/vacationsModel";


export class VacationsState {
    public vacations: VacationsType[] = []
}

export enum VacationsActionType {
    setVacations = 'SetVacations',
    addVacations = 'AddVacations',
    updateVacations = 'UpdateVacations',
    deleteVacations = 'DeleteVacations',
}

export type VacationPayload = VacationsType[] | number | VacationsType
export interface VacationsAction {
    type: VacationsActionType,
    payload: VacationPayload
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState }

    switch (action.type) {
        case VacationsActionType.setVacations:
            newState.vacations = action.payload as VacationsType[];
            break
        case VacationsActionType.addVacations:
            const singleVacation = action.payload as VacationsType;
            newState.vacations.push(singleVacation)
            break
        case VacationsActionType.deleteVacations:
            const vacationId = action.payload as number
            const indexToDelete = newState.vacations.findIndex(vacation => vacation.vacationId === vacationId)
            if (indexToDelete !== -1) newState.vacations.splice(indexToDelete, 1)
            break
        case VacationsActionType.updateVacations:
            const updateVacation = action.payload as VacationsType;
            const indexToUpdate = newState.vacations.findIndex(vacation => vacation.vacationId === updateVacation.vacationId)
            if (indexToUpdate !== -1) newState.vacations[indexToUpdate] = updateVacation
            break
    }

    return newState
}

export const vacationsStore = createStore(vacationsReducer)