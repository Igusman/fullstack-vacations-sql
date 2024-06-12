import { Route, Routes, Navigate } from "react-router-dom";
import { NotFound } from "../../NotFound/NotFound";
import { Home } from "../../../home/Home/Home";
import { About } from "../../../about/About/About";
import { Vactions } from "../../../vacations/Vactions/Vactions";
import { Login } from "../../../auth/login/login";
import { Signup } from "../../../auth/signup/signup";
import { VacationCard } from "../../../vacations/vacationCard/VacationCard";
import { UpdateVacation } from "../../../vacations/updateVacation/updateVacation";
import { AddVacation } from "../../../vacations/addVacation/addVacation";
import { ChartVacations } from "../../../vacations/chartVacations/chartVacations/chartVacations";
import "./Routing.css";


export function Routing(): JSX.Element {


    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/Vacations" element={<Vactions />} />
            <Route path="/chart" element={<ChartVacations />} />
            <Route path="/Vacations/:vacationId" element={<VacationCard />} />
            <Route path="/Vacations/AddVacation" element={<AddVacation />} />
            <Route path="/Vacations/updateVacation/:vacationId" element={<UpdateVacation />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/About" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
