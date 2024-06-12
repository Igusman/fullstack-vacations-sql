import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../../../models/userModel";
import { authStore } from "../../../redux/authState";
import { getAllFollowerCsvService } from "../../../services/followService";

export function Menu(): JSX.Element {

    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            const decodedUser = jwtDecode<{ user: UserType }>(token).user;
            setUser(decodedUser);
        }

        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if (token) {
                const decodedUser = jwtDecode<{ user: UserType }>(token).user;
                setUser(decodedUser);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribe
    }, []);





    return (
        <div className="Menu">
            <NavLink to={'/Home'}> Home </NavLink>
            <NavLink to={'/Vacations'} > Vacations </NavLink>
            {user?.role === 'admin' ?
                <div>
                    <NavLink to={'/chart'}> chart  </NavLink>  
                    <NavLink to={'/Vacations/AddVacation'} > AddVacation </NavLink>
                </div> : ''}
            <NavLink to={'/About'} >About </NavLink>
        </div>
    );
}




// return (
//     <div className="Menu">
//         <NavLink to={'/Home'}> Home </NavLink>
//         <NavLink to={'/Vacations'} > Vacations </NavLink>
//         {user?.role === 'admin' ? 
//         <NavLink to={'/Vacations/AddVacation'} > AddVacation </NavLink> :''}
//         <NavLink to={'/About'} >About </NavLink>
//     </div>
// );