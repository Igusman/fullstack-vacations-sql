import { NavLink } from "react-router-dom";
import "./Header.css";
import { Login } from "../../auth/login/login";
import { AuthMenu } from "../../auth/authMenu/authMenu";

export function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1 className="h1">Israel`s Worlds Tours</h1>
            <AuthMenu />
        </div>
    );
}
