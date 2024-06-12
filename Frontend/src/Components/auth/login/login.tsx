import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../../models/loginModel";
import { LoginService } from "../../../services/authService";
import notify from '../../../services/Notify'
import { useEffect } from "react";
import { authStore } from "../../../redux/authState";

export function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<LoginCredentials>()
    const navigate = useNavigate()

    const handleLoginForm = async (loginCredentials: LoginCredentials) => {
        try {
            await LoginService(loginCredentials)
            notify.success('you have been successfully login')
            if (loginCredentials.role === 'admin') { navigate('/home') }
            navigate('/Vacations')
        } catch (err) {
            notify.error(err)
        }
    }

    useEffect(() => {
        const token = authStore.getState().token
        if (token) {
            notify.error('You are already logged in')
            navigate('/Vacations')
        }
    }, [])

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(handleLoginForm)} className="login-form">
                    <div className="input-group">
                        <input  {...register('email', {
                            required: { value: true, message: 'email is required' }
                        },
                        )} placeholder="email" name="email" autoComplete="on" />
                        {formState.errors && <span className="error">{formState.errors.email?.message}</span>}

                    </div>
                    <div className="input-group">
                        <input type="password" {...register('password', {
                            required: { value: true, message: 'password is required' },
                            minLength: { value: 4, message: 'must be min of 4 letters', },
                        },
                        )} placeholder="password" name="password" autoComplete="on" />
                        {formState.errors && <span className="error">{formState.errors.password?.message}</span>}
                    </div>

                    <button >Login</button>
                    <NavLink to="/Signup">Don't have an account? Sign up</NavLink>
                </form>
            </div>
        </div>
    );
}


