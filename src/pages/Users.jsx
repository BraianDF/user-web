import { useEffect, useState } from "react";
import api from "../api/axios";

import ErrorModal from "../components/ErrorModal";
import UserModal from "../components/UserModal";
import CreateUserModal from "../components/CreateUserModal";

export default function Users() {

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [page, setPage] = useState({});
    const [searchEmail, setSearchEmail] = useState("");

    const [pageSize, setPageSize] = useState(5);
    const [sortField, setSortField] = useState("email");
    const [direction, setDirection] = useState("ASC");

    async function handleCloseModal() {

        setShowModal(false);

        setSelectedUserId(null);

        await loadUsers();
    }

    function handleError(message) {
        setErrorMessage(message);
        setShowModalError(true);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        loadUsers(0, searchEmail, pageSize, sortField, direction);
    };

    const changePage = (pageNumber) => {
        loadUsers(pageNumber, searchEmail, pageSize, sortField, direction);
    };

    const loadUsers = async (pageNumber = 0, email = searchEmail, size = pageSize, sort = sortField, dir = direction) => {

        try {

            const response = await api.get("/users", {
                params: {
                    page: pageNumber,
                    size,
                    sort: `${sort},${dir.toLowerCase()}`,
                    email
                }
            });

            setPage(response.data);

        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || "Erro ao buscar usuários.");
            setShowModalError(true);
        }
    };

    const handleSort = (field) => {

        let newDirection = "ASC";

        if (sortField === field && direction === "ASC") {
            newDirection = "DESC";
        }

        setSortField(field);
        setDirection(newDirection);

        loadUsers(
            0,
            searchEmail,
            pageSize,
            field,
            newDirection
        );
    };

    useEffect(() => {
        loadUsers();
    }, [pageSize, sortField, direction]);

    return (
        <>
        <div className="container py-5 d-flex justify-content-center">
        
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">

            <div className="card shadow border-0 rounded-4">

                <div className="card-body p-4">

                    {/* Header */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                        <div>
                            <h2 className="fw-bold mb-1">Usuários</h2>

                            <span className="text-secondary">
                                Total: {page?.totalElements || 0} usuários
                            </span>
                        </div>

                        <div className="d-flex gap-2 flex-wrap">

                        {/* Busca */}
                        <form
                            className="d-flex gap-2"
                            onSubmit={handleSearch}
                        >

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar por email..."
                                value={searchEmail}
                                onChange={(e) => setSearchEmail(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                <i className="bi bi-search"></i>
                            </button>

                        </form>

                        {/* Criar usuário */}
                        <button
                            className="btn btn-success"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Novo Usuário
                        </button>

                        </div>

                    </div>

                    {/* Tabela */}
                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead className="table-light">
                                <tr>
                                    <th>
                                        <button
                                            className="btn btn-sm fw-semibold border-0 p-0 d-flex align-items-center gap-2"
                                            onClick={() => handleSort("email")}
                                        >
                                            Email
                                            <i className={`bi ${
                                                sortField === "email"
                                                    ? direction === "ASC"
                                                        ? "bi-arrow-up"
                                                        : "bi-arrow-down"
                                                    : "bi-arrow-down-up"
                                            }`}>
                                            </i>
                                        
                                        </button>
                                        
                                    </th>
                                    <th>
                                        <button
                                            className="btn btn-sm fw-semibold border-0 p-0 d-flex align-items-center gap-2"
                                            onClick={() => handleSort("status")}
                                        >
                                            Status
                                            <i className={`bi ${
                                                sortField === "status"
                                                    ? direction === "ASC"
                                                        ? "bi-arrow-up"
                                                        : "bi-arrow-down"
                                                    : "bi-arrow-down-up"
                                            }`}>
                                            </i>
                                        </button>   
                                    </th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {page?.content?.map(user => (
                                    <tr key={user.idUsuario}>

                                        <td>
                                            <div className="fw-semibold">
                                                {user.email}
                                            </div>
                                        </td>

                                        <td>
                                            <span className={`badge ${user.status ? "bg-success" : "bg-danger"}`}>
                                                {user.status ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>

                                        <td className="text-center">

                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => {
                                                    setSelectedUserId(user.idUsuario);
                                                    setShowModal(true);
                                                    
                                                }}
                                            >
                                                <i className="bi bi-eye me-2"></i>
                                                Ver Detalhes
                                            </button>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Paginação */}
                    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">

                        <div className="text-secondary">
                            Exibindo {page?.numberOfElements || 0} de {page?.totalElements || 0} usuários
                        </div>

                        <nav>

                            <ul className="pagination mb-0">

                                {/* Anterior */}
                                <li className={`page-item ${page?.first ? "disabled" : ""}`}>

                                    <button
                                        className="page-link"
                                        onClick={() => changePage(page.number - 1)}
                                    >
                                        Anterior
                                    </button>

                                </li>

                                {/* Números */}
                                {[...Array(page?.totalPages || 0)].map((_, index) => (

                                    <li
                                        key={index}
                                        className={`page-item ${page?.number === index ? "active" : ""}`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={() => changePage(index)}
                                        >
                                            {index + 1}
                                        </button>

                                    </li>

                                ))}

                                {/* Próximo */}
                                <li className={`page-item ${page?.last ? "disabled" : ""}`}>

                                    <button
                                        className="page-link"
                                        onClick={() => changePage(page.number + 1)}
                                    >
                                        Próximo
                                    </button>

                                </li>

                            </ul>

                        </nav>

                    </div>

                </div>

            </div>

        </div>

        </div>

        <UserModal userId={selectedUserId} show={showModal} onClose={handleCloseModal} onError={handleError} />

        <CreateUserModal show={showCreateModal} onClose={() => setShowCreateModal(false)} onSuccess={loadUsers} onError={handleError} />

        <ErrorModal show={showModalError} message={errorMessage} onClose={() => setShowModalError(false)}/>
        </>
    );
}