import {  useParams } from "react-router-dom"
import { VacationsType } from "../../../models/vacationsModel"
import './VacationCard.css'
import { useEffect, useState } from "react"
import {  getOneVacationService } from "../../../services/vacationsService"
import { formatDate } from "../../../utils/formatDate"
import { formatPrice } from "../../../utils/formatPrice"
import { appConfig } from "../../../utils/appConfig"
import notify from "../../../services/Notify"

export const VacationCard = () => {
    const params = useParams()

    const vacationId = Number(params.vacationId)
    const [vacation, setVacation] = useState<VacationsType>()

    useEffect(() => {
        getOneVacationService(vacationId)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err))

    }, [vacationId])


    return (
        <div className="vacationDiv">
            <img src={`${appConfig.vacationImageUrl}/${vacation?.image}`} />
            <div>destination: {vacation?.destination}</div>
            <div>description: {vacation?.description}</div>
            <div>  Start Date: {vacation?.startDate ? formatDate(new Date(vacation.startDate)) : ""}</div>
            <div>  end Date: {vacation?.endDate ? formatDate(new Date(vacation.endDate)) : ""}</div>
            <div>price: {formatPrice(vacation?.price)} </div>
        </div>
    )
}