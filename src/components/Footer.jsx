import { NavLink } from "react-router-dom";

export default function Footer() {

    return (
        <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"> 
            <div className="col-md-4 d-flex align-items-center"> 
                <NavLink to="/home" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap"> 
                    <i className="bi bi-person-circle fs-3" width="30"></i>
                </NavLink> 
                <span className="mb-3 mb-md-0 text-body-secondary">© 2026 Geraldo Braian Negrini Batista</span> 
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex"> 
                <li className="ms-3">
                    <a className="text-body-secondary" href="https://github.com/BraianDF" aria-label="GitHub">
                        <i className="bi bi-github fs-4"></i>
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-body-secondary" href="#" aria-label="FrontEnd">
                        <i className="bi bi-globe fs-4"></i>
                    </a>
                </li> 
                <li className="ms-3">
                    <a className="text-body-secondary" href="https://github.com/BraianDF/user-service" aria-label="BackEnd">
                        <i className="bi bi-server fs-4"></i>
                    </a>
                </li>
            </ul> 
        </footer>
        </div>
    )
}