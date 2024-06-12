import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../../redux/authState";
import { formatDate } from "../../../utils/formatDate";
import { appConfig } from "../../../utils/appConfig";
import { formatPrice } from "../../../utils/formatPrice";
import notify from "../../../services/Notify";
import { deleteVacationService } from "../../../services/vacationsService";
import { VacationsType } from "../../../models/vacationsModel";
import { UserType } from "../../../models/userModel";
import './VacationsCards.css';
import { jwtDecode } from "jwt-decode";
import { startFollowingService } from "../../../services/followService";
import { StartFollowType } from "../../../models/followersModel";

interface vacationsCardProp {
    vacations: VacationsType;
    numberOfFollowers: number;
}

export const VacationsCard = (props: vacationsCardProp) => {
    const [user, setUser] = useState<UserType>();
    const [followersCount, setFollowersCount] = useState<number>(props.numberOfFollowers);
    const navigate = useNavigate()
    
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

        return () => {
            unsubscribe();
        };
    }, []);

    const handleDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this vacation?");
        if (!confirmation) {
            notify.error("Vacation deletion cancelled.");
            return;
        }

        try {
            await deleteVacationService(props.vacations.vacationId);
            notify.success("Vacation deleted successfully");
        } catch (err) {
            notify.error(err);
        }
    };

    const handleFollow = async () => {
        const followData: StartFollowType = {
            userId: user?.userId,
            vacationId: props.vacations.vacationId,
        };

        try {
            await startFollowingService(followData);

            if (followersCount > props.numberOfFollowers) {
                setFollowersCount(followersCount - 1);
                notify.success("Unfollowed successfully");
            } else {
                setFollowersCount(followersCount + 1);
                notify.success("Followed successfully");
            }
        } catch (err) {
            notify.error(err);
        }
    };

    return (
        <div className="vacationsDiv">

            <img src={`${appConfig.vacationImageUrl}/${props.vacations.image}`} alt="Vacation" />
            <div>Destination: {props.vacations.destination}</div>
            <div>{`${formatDate(props.vacations.startDate)} - ${formatDate(props.vacations.endDate)}`}</div>
            <div>Description: {props.vacations.description}</div>
            <NavLink to={`${props.vacations.vacationId}`}>Price: {formatPrice(props.vacations.price)}</NavLink>
            <br />
            {user?.role === 'admin' && (
                <>
                    <NavLink to={`updateVacation/${props.vacations.vacationId}`}>Edit</NavLink>
                    <br />
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
            {user?.role === 'user' && (
                <>
                    <button onClick={handleFollow}>Follow</button>
                    {followersCount >= 1 && <span>{followersCount}</span>}
                </>
            )}
        </div>
    );
};
