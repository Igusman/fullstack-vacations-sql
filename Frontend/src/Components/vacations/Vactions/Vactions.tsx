import { useEffect, useState } from "react";
import { getAllVacationsService } from "../../../services/vacationsService";
import { VacationsType } from "../../../models/vacationsModel";
import "./Vactions.css";
import { VacationsCard } from "../vacationsCard/VacationsCards";
import { vacationsStore } from "../../../redux/vacationState";
import notify from "../../../services/Notify";
import { useNavigate } from "react-router-dom";
import { getFollowersByVacationsService, getFollowersByUserIdService } from "../../../services/followService";
import { authStore } from "../../../redux/authState";
import { jwtDecode } from "jwt-decode";
import Pagination from "../../pagination/pagination";

interface FollowersMap {
    [key: number]: number;
}

interface VacationsListProps {
    vacations: VacationsType[];
}

interface FollowerType {
    vacationId: number;
}

interface UserType {
    userId: string;
}

export function Vactions(): JSX.Element {
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<VacationsType[]>([]);
    const [followers, setFollowers] = useState<FollowersMap>({});
    const [isCheckedUserFollow, setIsCheckedUserFollow] = useState(false);
    const [isCheckedUnStarted, setIsCheckedUnStarted] = useState(false);
    const [isCheckedCurrent, setIsCheckedCurrent] = useState(false);
    const [userFollows, setUserFollows] = useState<number[]>([]); // State to store user's followed vacations
    const [user, setUser] = useState<UserType | undefined>(undefined); // State to store user information

    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            try {
                const decodedUser = jwtDecode<{ user: UserType }>(token).user;
                setUser(decodedUser);
            } catch (err) {
                notify.error("Invalid token. Redirecting to home page.");
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            }
        } else {
            setTimeout(() => {
                navigate('/home');
            }, 2000);
            notify.error("Need to login or signup");
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

    useEffect(() => {
        // Map the vacations by startDate
        const fetchVacationsAndFollowers = async () => {
            try {
                const vacationsData = await getAllVacationsService();

                // Sort the vacations by start date
                const sortedVacations = vacationsData.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                setVacations(sortedVacations);

                const followersData = await Promise.all(
                    sortedVacations.map(vacation =>
                        getFollowersByVacationsService(vacation.vacationId)
                            .then(response => ({
                                vacationId: vacation.vacationId,
                                numberOfFollowers: response[0]?.numberOfFollowers || 0
                            }))
                            .catch(err => {
                                notify.error(`Error fetching followers for vacation ${vacation.vacationId}:`);
                                return { vacationId: vacation.vacationId, numberOfFollowers: 0 };
                            })
                    )
                );
                const followersMap: FollowersMap = followersData.reduce((acc, { vacationId, numberOfFollowers }) => {
                    acc[vacationId] = numberOfFollowers;
                    return acc;
                }, {} as FollowersMap);
                setFollowers(followersMap);

                // Fetch the vacations the user is following
                if (user) {
                    const userFollowsData: FollowerType[] = await getFollowersByUserIdService(user.userId);
                    const userFollowedVacationIds = userFollowsData.map(follow => follow.vacationId);
                    setUserFollows(userFollowedVacationIds);
                } else {
                    notify.error('User not found. Please log in.');
                    setTimeout(() => {
                        navigate('/Login');
                    }, 2000);
                }
            } catch (err) {
                notify.error('Sign in or sign up to see this page');
                setTimeout(() => {
                    navigate('/Login');
                }, 2000);
            }
        };

        if (user) {
            fetchVacationsAndFollowers();
        }

        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations([...vacationsStore.getState().vacations]);
        });
        return () => {
            unsubscribe();
        };
    }, [navigate, user]);

    const handleCheckboxForfollowed = () => {
        setIsCheckedUserFollow(!isCheckedUserFollow);
    };

    const handleCheckboxisUnStarted = () => {
        setIsCheckedUnStarted(!isCheckedUnStarted);
        if (!isCheckedUnStarted) {
            setIsCheckedCurrent(false);
        }
    };

    const handleCheckboxisCheckedCurrent = () => {
        setIsCheckedCurrent(!isCheckedCurrent);
        if (!isCheckedCurrent) {
            setIsCheckedUnStarted(false);
        }
    };

    const filteredVacations = vacations.filter(vacation => {
        const isFollowing = userFollows.includes(vacation.vacationId);
        const isUnstarted = new Date(vacation.startDate).getTime() > Date.now();
        const isCurrent = new Date(vacation.startDate).getTime() <= Date.now() && new Date(vacation.endDate).getTime() >= Date.now();

        return (isCheckedUserFollow ? isFollowing : true) &&
            (isCheckedUnStarted ? isUnstarted : true) &&
            (isCheckedCurrent ? isCurrent : true);
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVacations = filteredVacations.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="Vactions">
            <div id="checkboxInputs">
                <input
                    type="checkbox"
                    id="checkboxFollow"
                    checked={isCheckedUserFollow}
                    onChange={handleCheckboxForfollowed}
                />
                <label htmlFor="checkboxFollow">Show only followed vacations</label>
                <input
                    type="checkbox"
                    id="checkboxUnStarted"
                    checked={isCheckedUnStarted}
                    onChange={handleCheckboxisUnStarted}
                />
                <label htmlFor="checkboxUnStarted">Show unstarted vacations</label>
                <input
                    type="checkbox"
                    id="checkboxCurrent"
                    checked={isCheckedCurrent}
                    onChange={handleCheckboxisCheckedCurrent}
                />
                <label htmlFor="checkboxCurrent">Show current vacations</label>
            </div>

            {currentVacations.map(vacation => (
                <VacationsCard
                    vacations={vacation}
                    key={vacation.vacationId}
                    numberOfFollowers={followers[vacation.vacationId] || 0}
                />
            ))}
            <br />
            <div className="pagi">

                <Pagination
                    totalItems={filteredVacations.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
