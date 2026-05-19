import { useEffect, useState } from "react";
import api from "../api/axios";
import SuccessModal from "./SuccessModal";

export default function UserModal({ userId, show, onClose, onError }) {
    
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estados de edição
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [editingRoles, setEditingRoles] = useState(false);

    // Formulários
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newStatus, setNewStatus] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const availableRoles = ["USER", "ADMIN", "EDITOR", "VIEWER"];

    const loadUser = async () => {

        if (!userId) return;

        try {

            setLoading(true);

            const response = await api.get(`/users/${userId}`);

            setUser(response.data);

        } catch (error) {

            console.error(error);
            onError?.(error.response?.data?.message || "Erro ao buscar dados do usuário.");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        if (!show || !userId) return;

        loadUser();

    }, [show, userId]);

    // Atualizar email
    async function handleUpdateEmail() {

        try {

            await api.patch(`/users/${userId}/email`, {
                email: newEmail
            });

            setEditingEmail(false);

            setSuccessMessage("Email atualizado com sucesso!");
            setShowSuccess(true);

            await loadUser();

        } catch (error) {

            console.error(error);
            onError?.(error.response?.data?.message || "Erro ao atualizar o email.");

        }
    }

    // Atualizar senha
    async function handleUpdatePassword() {

        try {

            await api.patch(`/users/${userId}/senha`, {
                senhaNova: newPassword
            });

            setNewPassword("");

            setEditingPassword(false);

            setSuccessMessage("Senha atualizada com sucesso!");
            setShowSuccess(true);

        } catch (error) {

            console.error(error);
            onError?.(error.response?.data?.message || "Erro ao atualizar a senha.");

        }
    }

    // Atualizar status
    async function handleUpdateStatus() {

        try {

            await api.patch(`/users/${userId}/status`, {
                status: newStatus
            });

            setEditingStatus(false);

            setSuccessMessage("Status atualizado com sucesso!");
            setShowSuccess(true);

            await loadUser();

        } catch (error) {

            console.error(error);
            onError?.(error.response?.data?.message || "Erro ao atualizar o status.");

        }
    }

    // Atualizar roles
    async function handleUpdateRoles() {

        try {

            await api.patch(`/users/${userId}/roles`, {
                roles: selectedRoles
            });

            setEditingRoles(false);

            setSuccessMessage("Roles atualizadas com sucesso!");
            setShowSuccess(true);

            await loadUser();

        } catch (error) {

            console.error(error);
            onError?.(error.response?.data?.message || "Erro ao atualizar as roles.");

        }
    }

    // Excluir usuário
    async function handleDeleteUser() {

        try {

            await api.delete(`/users/${userId}`);

            setSuccessMessage("Usuário excluído com sucesso!");
            setShowSuccess(true);

            onClose();

        } catch (error) {

            console.error(error);
            onError?.(error.response?.data?.message || "Erro ao excluír o usuário.");

        }
    }

    // Seleção de roles
    function handleRoleChange(role) {

        if (selectedRoles.includes(role)) {

            setSelectedRoles(
                selectedRoles.filter(r => r !== role)
            );

        } else {

            setSelectedRoles([
                ...selectedRoles,
                role
            ]);

        }
    }

    if (!show) return null;

    return (
        <>
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog modal-dialog-centered modal-lg justify-content-center">

                <div className="modal-content border-0 rounded-4 w-75">

                    <div className="modal-header border-0 pb-0">

                        <h4 className="modal-title fw-bold">
                            Perfil do Usuário
                        </h4>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body p-4">

                        {loading ? (
                            <p>Carregando...</p>
                        ) : user && (
                            <>

                                {/* Email */}
                                <div className="border rounded-3 p-3 mb-3">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div className="w-100 me-3">

                                            <small className="text-secondary d-block">
                                                Email
                                            </small>

                                            {!editingEmail ? (
                                                <strong>{user.email}</strong>
                                            ) : (
                                                <input
                                                    type="email"
                                                    className="form-control mt-2"
                                                    value={newEmail}
                                                    onChange={(e) => setNewEmail(e.target.value)}
                                                />
                                            )}

                                        </div>

                                        {!editingEmail ? (
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => {
                                                    setNewEmail(user.email);
                                                    setEditingEmail(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>
                                                Editar
                                            </button>
                                        ) : (
                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={handleUpdateEmail}
                                                >
                                                    Salvar
                                                </button>

                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => setEditingEmail(false)}
                                                >
                                                    Cancelar
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                </div>

                                {/* Senha */}
                                <div className="border rounded-3 p-3 mb-3">

                                    <small className="text-secondary d-block">
                                        Senha
                                    </small>

                                    {!editingPassword ? (
                                        <div className="d-flex justify-content-between align-items-center">

                                            <strong>************</strong>

                                            <button
                                                className="btn btn-outline-warning btn-sm"
                                                onClick={() => setEditingPassword(true)}
                                            >
                                                <i className="bi bi-key me-2"></i>
                                                Atualizar Senha
                                            </button>

                                        </div>
                                    ) : (
                                        <div>

                                            <input
                                                type="password"
                                                className="form-control mb-3"
                                                placeholder="Nova senha"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />

                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={handleUpdatePassword}
                                                >
                                                    Salvar
                                                </button>

                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => setEditingPassword(false)}
                                                >
                                                    Cancelar
                                                </button>

                                            </div>

                                        </div>
                                    )}

                                </div>

                                {/* Status */}
                                <div className="border rounded-3 p-3 mb-3">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <small className="text-secondary d-block">
                                                Status
                                            </small>

                                            {!editingStatus ? (
                                                <span className={`badge ${user.status ? "bg-success" : "bg-danger"}`}>
                                                    {user.status ? "Ativo" : "Inativo"}
                                                </span>
                                            ) : (
                                                <select
                                                    className="form-select mt-2"
                                                    value={newStatus}
                                                    onChange={(e) =>
                                                        setNewStatus(e.target.value === "true")
                                                    }
                                                >
                                                    <option value="true">
                                                        Ativo
                                                    </option>

                                                    <option value="false">
                                                        Inativo
                                                    </option>

                                                </select>
                                            )}

                                        </div>

                                        {!editingStatus ? (
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => {
                                                    setNewStatus(user.status);
                                                    setEditingStatus(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>
                                                Editar
                                            </button>
                                        ) : (
                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={handleUpdateStatus}
                                                >
                                                    Salvar
                                                </button>

                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => setEditingStatus(false)}
                                                >
                                                    Cancelar
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                </div>

                                {/* Roles */}
                                <div className="border rounded-3 p-3 mb-3">

                                    <small className="text-secondary d-block mb-2">
                                        Roles
                                    </small>

                                    {!editingRoles ? (
                                        <div className="d-flex justify-content-between align-items-center">

                                            <div className="d-flex gap-2 flex-wrap">

                                                {user.roles?.map((role, i) => (
                                                    <span
                                                        key={i}
                                                        className="badge bg-dark-subtle text-dark border"
                                                    >
                                                        {role}
                                                    </span>
                                                ))}

                                            </div>

                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => {
                                                    setSelectedRoles(user.roles || []);
                                                    setEditingRoles(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>
                                                Editar
                                            </button>

                                        </div>
                                    ) : (
                                        <div>

                                            <div className="d-flex flex-wrap gap-3 mb-3">

                                                {availableRoles.map((role) => (

                                                    <div
                                                        className="form-check"
                                                        key={role}
                                                    >

                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={selectedRoles.includes(role)}
                                                            onChange={() => handleRoleChange(role)}
                                                            id={role}
                                                        />

                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={role}
                                                        >
                                                            {role}
                                                        </label>

                                                    </div>
                                                ))}

                                            </div>

                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={handleUpdateRoles}
                                                >
                                                    Salvar
                                                </button>

                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => setEditingRoles(false)}
                                                >
                                                    Cancelar
                                                </button>

                                            </div>

                                        </div>
                                    )}

                                </div>

                                {/* Excluir Conta */}
                                <div className="text-center p-3">

                                    <button
                                        className="btn btn-outline-danger px-4"
                                        onClick={handleDeleteUser}
                                    >
                                        <i className="bi bi-trash3 me-2"></i>
                                        Excluir Conta
                                    </button>

                                </div>

                            </>
                        )}

                    </div>

                </div>

            </div>

        </div>
        <SuccessModal show={showSuccess} message={successMessage} onClose={() => setShowSuccess(false)}/>
        </>
    );
}