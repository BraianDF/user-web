import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";

import api from "../api/axios";

export default function Profile() {

    const { user, loadUser } = useContext(AuthContext);

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Estados de controle
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    // Formulários
    const [newEmail, setNewEmail] = useState("");

    const [passwordData, setPasswordData] = useState({
        senhaAtual: "",
        senhaNova: ""
    });

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        try {
            await loadUser();
        } catch (error) {
            console.error(error);

            setErrorMessage(
                error.response?.data?.message ||
                "Erro ao buscar dados do usuário."
            );

            setShowModal(true);
        }
    }

    // Atualizar Email
    async function handleUpdateEmail() {
        try {

            await api.patch("/users/me/email", {
                email: newEmail
            });

            setEditingEmail(false);

            setSuccessMessage("Email atualizado com sucesso!");
            setShowSuccess(true);

            await fetchUser();

        } catch (error) {

            console.error(error);

            setErrorMessage(
                error.response?.data?.message ||
                "Erro ao atualizar email."
            );

            setShowModal(true);
        }
    }

    // Atualizar Senha
    async function handleUpdatePassword() {
        try {

            await api.patch("/users/me/senha", {
                senhaAtual: passwordData.senhaAtual,
                senhaNova: passwordData.senhaNova
            });

            setPasswordData({
                senhaAtual: "",
                senhaNova: ""
            });

            setEditingPassword(false);

            setSuccessMessage("Senha atualizada com sucesso!");
            setShowSuccess(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(
                error.response?.data?.message ||
                "Erro ao atualizar senha."
            );

            setShowModal(true);
        }
    }

    // Cancelar conta
    async function handleDisableAccount() {
        try {

            await api.patch("/users/me/status", {
                status: false
            });

            setSuccessMessage("Usuário cancelado com sucesso!");
            setShowSuccess(true);

            await fetchUser();

        } catch (error) {

            console.error(error);

            setErrorMessage(
                error.response?.data?.message ||
                "Erro ao cancelar conta."
            );

            setShowModal(true);
        }
    }

    return (
        <>
            <div className="container py-5 d-flex justify-content-center">

                <div className="card shadow border-0 rounded-4 w-50">

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            
                            <h2 className="fw-bold mb-0">
                                Meu Perfil
                            </h2>

                            <span className={`badge ${user?.status ? "bg-success" : "bg-danger"} fs-6`}>
                                {user?.status ? "Ativo" : "Inativo"}
                            </span>

                        </div>

                        {/* Email */}
                        <div className="border rounded-3 p-3 mb-3">

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="w-100 me-3">

                                    <small className="text-secondary d-block">
                                        Email
                                    </small>

                                    {!editingEmail ? (
                                        <strong>{user?.email}</strong>
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
                                            setNewEmail(user?.email || "");
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
                                        className="form-control mb-2"
                                        placeholder="Senha atual"
                                        value={passwordData.senhaAtual}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                senhaAtual: e.target.value
                                            })
                                        }
                                    />

                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Nova senha"
                                        value={passwordData.senhaNova}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                senhaNova: e.target.value
                                            })
                                        }
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

                        {/* Roles */}
                        <div className="border rounded-3 p-3">

                            <small className="text-secondary d-block mb-1">
                                Roles
                            </small>

                            <div className="d-flex flex-wrap gap-2">

                                {user?.roles?.map((role, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-dark-subtle text-dark border"
                                    >
                                        {role}
                                    </span>
                                ))}

                            </div>

                        </div>

                        {/* Cancelar Conta */}
                        <div className="text-center p-3">

                            <button
                                className="btn btn-outline-danger px-4"
                                onClick={handleDisableAccount}
                            >
                                <i className="bi bi-trash3 me-2"></i>
                                Cancelar Conta
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <ErrorModal
                show={showModal}
                message={errorMessage}
                onClose={() => setShowModal(false)}
            />

            <SuccessModal show={showSuccess} message={successMessage} onClose={() => setShowSuccess(false)}/>
        </>
    );
}