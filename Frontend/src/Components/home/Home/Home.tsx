import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { UserType } from "../../../models/userModel";
import { authStore } from "../../../redux/authState";
import "./Home.css";
import { NavLink } from "react-router-dom";

export function Home(): JSX.Element {

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


    return (
        <div className="Home">

            {!user?.role ? <h3>wellcome guest to start your vacation you need to <NavLink to="/Login">Login</NavLink> or <NavLink to={'/Signup'}>Signup</NavLink></h3> :
                <h3>wellcome back i missed you</h3>}
        </div>
    );
}
