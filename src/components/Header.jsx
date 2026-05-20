import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {

    const { user, logout } = useContext(AuthContext);

    return (

        <header>
            <div className="px-2 py-2 text-bg-dark border-bottom">
                <div className="container">

                    <div className="d-flex justify-content-center">

                        <ul className="nav w-100 justify-content-around justify-content-md-center gap-md-4 text-small flex-nowrap flex-md-wrap">

                            <li className="nav-item">
                                <NavLink
                                    to="/home"
                                    className={({ isActive }) =>
                                        `nav-link d-flex flex-column align-items-center px-2 py-1 ${
                                            isActive ? "text-white" : "text-secondary"
                                        }`
                                    }
                                >
                                    <i className="bi bi-house-door fs-5 fs-md-4"></i>
                                    <span className="small">Home</span>
                                </NavLink>
                            </li>

                            {user?.roles?.includes("ADMIN") && (
                                <li className="nav-item">
                                    <NavLink
                                        to="/users"
                                        className={({ isActive }) =>
                                            `nav-link d-flex flex-column align-items-center px-2 py-1 ${
                                                isActive ? "text-white" : "text-secondary"
                                            }`
                                        }
                                    >
                                        <i className="bi bi-table fs-5 fs-md-4"></i>
                                        <span className="small">Usuários</span>
                                    </NavLink>
                                </li>
                            )}

                            <li className="nav-item">
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `nav-link d-flex flex-column align-items-center px-2 py-1 ${
                                            isActive ? "text-white" : "text-secondary"
                                        }`
                                    }
                                >
                                    <i className="bi bi-person-circle fs-5 fs-md-4"></i>
                                    <span className="small">Perfil</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <button
                                    onClick={logout}
                                    className="nav-link text-secondary d-flex flex-column align-items-center px-2 py-1 border-0 bg-transparent"
                                >
                                    <i className="bi bi-door-open fs-5 fs-md-4"></i>
                                    <span className="small">Logout</span>
                                </button>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </header>
    );
}