import { NavLink } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="border-top mt-auto py-3 bg-body-tertiary">

            <div className="container">

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

                    {/* Logo + texto */}
                    <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-2">

                        <NavLink
                            to="/home"
                            className="text-body-secondary text-decoration-none"
                        >
                            <i className="bi bi-person-circle fs-3"></i>
                        </NavLink>

                        <span className="text-body-secondary small">
                            © 2026 Geraldo Braian Negrini Batista
                        </span>

                    </div>

                    {/* Links */}
                    <ul className="nav list-unstyled d-flex gap-3 mb-0">

                        <li>
                            <a
                                className="text-body-secondary"
                                href="https://github.com/BraianDF"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                            >
                                <i className="bi bi-github fs-4"></i>
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-body-secondary"
                                href="https://github.com/BraianDF/user-web"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Frontend"
                            >
                                <i className="bi bi-globe fs-4"></i>
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-body-secondary"
                                href="https://github.com/BraianDF/user-service"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Backend"
                            >
                                <i className="bi bi-server fs-4"></i>
                            </a>
                        </li>

                    </ul>

                </div>

            </div>

        </footer>
    );
}