import { useNavigate, useParams } from "react-router-dom";
import "./updateVacation.css";
import { useState, useEffect } from "react";
import { VacationsType } from "../../../models/vacationsModel";
import { getOneVacationService, updateVacationService } from "../../../services/vacationsService";
import { useForm } from "react-hook-form";
import notify from "../../../services/Notify";
import { getFollowersByVacationsService } from "../../../services/followService";
import { FollowerType } from "../../../models/followersModel";

export function UpdateVacation(): JSX.Element {
    const params = useParams()
    const { handleSubmit, setValue, register, formState, watch } = useForm<VacationsType>()
    const vacationId = Number(params.vacationId)
    const [vacation, setVacation] = useState<VacationsType>()
    const navigate = useNavigate()
    const [follow, setFollow] = useState<FollowerType[]>([])


    useEffect(() => {
        getOneVacationService(vacationId)
            .then(vacation => {
                setVacation(vacation);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setValue("image", vacation.image);
            })
            .catch(err => console.log(err));
        getFollowersByVacationsService(vacationId)
            .then(follow => setFollow(follow))
            .catch(err => console.log(err))


    }, [vacationId, setValue]);


    const submitUpdateVacation = async (updatedVacation: VacationsType) => {
        try {
            if (updatedVacation.imageFile) {
                const file = (updatedVacation.imageFile as unknown as FileList)[0]
                updatedVacation.imageFile = file
            }
            await updateVacationService(updatedVacation, vacationId)
            notify.success(updatedVacation.destination + "successfully updated")
            navigate('/Vacations')
        } catch (err) {
            notify.error(err)
        }
    }
    const startDate = watch('startDate');
    const endDate = watch('endDate');


    return (
        <div className="updateVacation">
            <form onSubmit={handleSubmit(submitUpdateVacation)}>
                <h2>update Vacation</h2>
                <input type="text" placeholder="destination"
                    {...register('destination', {
                        required: { value: true, message: 'must enter a destination' },
                        minLength: { value: 5, message: "must be more then 3 letters" },
                        maxLength: { value: 50, message: "must be less then 50 letters" },
                    })} />
                {formState.errors && <span className="error">{formState.errors.destination?.message}</span>}

                <br />
                <input type="text" placeholder="description" {...register('description', {
                    required: { value: true, message: "must enter description" },
                    minLength: { value: 5, message: "must be more then 5 letters" },
                    maxLength: { value: 50, message: 'must be less then 300 letters' }
                })} />
                <br />
                {formState.errors && <span className="error">{formState.errors.description?.message}</span>}
                <br />
                <br />
                <input
                    type="date"
                    placeholder="startDate"
                    {...register('startDate', {
                        required: { value: true, message: "must enter a start date" },
                        validate: { beforeEndDate: value => !endDate || new Date(value) <= new Date(endDate) || 'Start date must be before end date' }
                    })}
                />
                <br />
                {formState.errors.startDate && <span className="error">{formState.errors.startDate?.message}</span>}
                <br />
                <input
                    type="date"
                    placeholder="endDate"
                    {...register('endDate', {
                        required: { value: true, message: "must enter an end date" },
                        validate: { afterStartDate: value => !startDate || new Date(value) >= new Date(startDate) || 'End date must be after start date' }
                    })}
                />
                <br />
                {formState.errors.endDate && <span className="error">{formState.errors.endDate.message}</span>}
                <br />
                <input type="number" placeholder="price" {...register('price', {
                    required: { value: true, message: "must enter a price" },
                    min: { value: 10, message: 'min price cant be less then 10' },
                    max: { value: 30000, message: 'max price cant be more then 30000' }
                })} />
                <br />
                {formState.errors.price && <span className="error">{formState.errors.price.message}</span>}
                <br />
                <input type="file" placeholder="image" accept="image/*" {...register('imageFile', { required: false })} />
                <br />
                <button>submit</button>
            </form>

        </div>
    );
}
