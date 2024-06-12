import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css";
import { SignupCredentials } from "../../../models/signupModel";
import { useForm } from "react-hook-form";
import { signupService } from "../../../services/authService";
import { useEffect } from "react";
import { authStore } from "../../../redux/authState";
import notify from "../../../services/Notify";

export function Signup(): JSX.Element {


    const { register, handleSubmit, formState } = useForm<SignupCredentials>()
    const navigate = useNavigate()

    const handleSignupForm = async (signupCredentials: SignupCredentials): Promise<void> => {
        try {
            await signupService(signupCredentials)
            notify.success('you have been successfully signup')
            navigate('/Vacations')
        } catch (err) {
            notify.error(err)
        }
    }

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            notify.error('You are already logged in')
            navigate('/Vacations');
        }
    })

    return (
        <div className="signup">
            <div className="signup-box">
                <h2>SignUp</h2>
                <form onSubmit={handleSubmit(handleSignupForm)} className="signup-form" >
                    <div className="signup-input-group">
                        <input type="text"  {...register('firstName', {
                            required: {
                                value: true,
                                message: 'firstName is required',
                            },
                            minLength: {
                                value: 4,
                                message: 'must be min of 4 letters',
                            },
                        },
                        )} placeholder="firstName" name="firstName" autoComplete="on" />
                        {formState.errors && <span className="error">{formState.errors.firstName?.message}</span>}
                    </div>
                    <div className="signup-input-group">
                        <input type="text"  {...register('lastName', {
                            required: {
                                value: true,
                                message: 'lastname is required',
                            },
                            minLength: {
                                value: 4,
                                message: 'must be min of 4 letters',
                            },

                        },
                        )} placeholder="lastName" name="lastName" autoComplete="on" />
                        {formState.errors && <span className="error">{formState.errors.lastName?.message}</span>}
                    </div>

                    <div className="signup-input-group">
                        <input type="text"  {...register('email', {
                            required: {
                                value: true,
                                message: 'email is required',
                            }
                        },
                        )} placeholder="email" name="email" autoComplete="on" />
                        {formState.errors && <span className="error">{formState.errors.email?.message}</span>}

                    </div>
                    <div className="signup-input-group">
                        <input type="password" {...register('password', {
                            required: {
                                value: true,
                                message: 'password is required'
                            },
                            minLength: {
                                value: 4,
                                message: 'must be min of 4 letters',
                            },
                        },
                        )} placeholder="password" name="password" autoComplete="on" />
                        {formState.errors && <span className="error">{formState.errors.password?.message}</span>}

                    </div>

                    <button >Signup</button>
                    <NavLink to={'/Login'}>already a user? login</NavLink>

                </form>
            </div>
        </div>
    );
}
