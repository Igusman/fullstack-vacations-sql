import { useForm } from "react-hook-form";
import "./addVacation.css";
import { VacationsType } from "../../../models/vacationsModel";
import notify from "../../../services/Notify";
import { addVacationService } from "../../../services/vacationsService";
import { useNavigate } from "react-router-dom";

export function AddVacation(): JSX.Element {
    

    const { register, handleSubmit, formState, watch } = useForm<VacationsType>()
    const navigate = useNavigate()

    const submitNewVacation = async (newVacation: VacationsType) => {
        try {
            const file = (newVacation.imageFile as unknown as FileList)[0]
            newVacation.imageFile = file
            await addVacationService(newVacation)
            notify.success(newVacation.description + "successfully added")
            setTimeout(() => {
                navigate('/Vacations')
            }, 2000)
        } catch (err) {
            notify.error(err)
        }
    }
    const startDate = watch('startDate');
    const endDate = watch('endDate');

    
    return (
        <div className="addVacation">
            <form onSubmit={handleSubmit(submitNewVacation)}>
                <h2>Add Vacation</h2>
                <input type="text" placeholder="destination" {...register('destination', {
                    required: { value: true, message: "must enter destination" },
                    minLength: { value: 5, message: "must be more then 5 letters" },
                    maxLength: { value: 50, message: 'must be less then 50 letters' }
                })}
                />
                <br />
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
                <input type="file" placeholder="image" accept="image/*" {...register('imageFile')} />
                <br />
                <button>submit</button>
            </form>
        </div>
    );
}
