import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Header() {

    const { user, logout } = useContext(AuthContext);

    return (

        <header> 
            <div className="px-3 py-2 text-bg-dark border-bottom"> 
                <div className="container"> 
                    <div className="d-flex flex-wrap align-items-center justify-content-center"> 
                        <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"> 
                            <li> 
                                <NavLink to="/home" className={({ isActive }) => `nav-link d-flex flex-column align-items-center ${isActive ? "text-white" : "text-secondary"}`}> 
                                    <i className="bi bi-house-door fs-4" ></i>
                                    <span>Home</span>
                                </NavLink>
                            </li>

                            {user?.roles?.includes("ADMIN") && (

                            <li> 
                                <NavLink to="/users" className={({ isActive }) => `nav-link d-flex flex-column align-items-center ${isActive ? "text-white" : "text-secondary"}`}> 
                                    <i className="bi bi-table fs-4"></i>
                                    <span>Usuários</span>
                                </NavLink>
                            </li>

                             )}

                            
                            <li>
                                <NavLink to="/profile" className={({ isActive }) => `nav-link d-flex flex-column align-items-center ${isActive ? "text-white" : "text-secondary"}`}>
                                    <i className="bi bi-person-circle fs-4"></i>
                                    <span>Perfil</span>
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={logout} className="nav-link text-secondary d-flex flex-column align-items-center">
                                    <i className="bi bi-door-open fs-4"></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
                                
        </header>
    );
}