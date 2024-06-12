import { useEffect, useState } from "react";
import "./authMenu.css";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../redux/authState";
import { jwtDecode } from "jwt-decode";
import notify from "../../../services/Notify";
import { logoutService } from '../../../services/authService'
import { UserType } from "../../../models/userModel";

export function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const token = authStore.getState().token
        if (token) {
            const user = jwtDecode<{ user: UserType }>(token).user
            setUser(user)

        }
        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if (token) {
                const user = jwtDecode<{ user: UserType }>(token).user;
                setUser(user);
            } else {
                setUser(undefined)
            }
        })
        return unsubscribe
    }, [])

    function logoutFunc() {
        logoutService();
        notify.success('logged out successfully');
    }
    return (
        <div className="authMenu">
            {!user &&
                <div>
                    <span>Hello Guset | </span>
                    <NavLink to={'/Signup'}>signup</NavLink>
                    <span> | </span>
                    <NavLink to={'/Login'}>login</NavLink>
                </div>
            }
            {user &&
                <div>
                    <span>hello {user?.firstName + ' ' + user.lastName} </span>
                    <NavLink to={'/home'} onClick={logoutFunc}>logout</NavLink>
                </div>
            }
        </div>
    );
}
