import { useState } from "react";
import api from "../api/axios";
import SuccessModal from "./SuccessModal";

export default function CreateUserModal({ show, onClose, onSuccess, onError }) {

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);

    const [loading, setLoading] = useState(false);

    const availableRoles = ["USER", "ADMIN", "EDITOR", "VIEWER"];

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

    async function handleCreateUser(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/users", {
                email,
                senha,
                roles: selectedRoles
            });

            setSuccessMessage("Usuário criado com sucesso!");
            setShowSuccess(true);

            // Limpar formulário
            setEmail("");
            setSenha("");
            setSelectedRoles([]);

            onSuccess?.();

        } catch (error) {

            console.error(error);

            onError?.(
                error.response?.data?.message ||
                "Erro ao criar usuário."
            );

        } finally {

            setLoading(false);

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

                <div className="modal-dialog modal-dialog-centered modal-lg px-2">

                    <div className="modal-content border-0 rounded-4 w-100">

                        <div className="modal-header border-0 pb-0">

                            <h4 className="modal-title fw-bold">
                                Criar Usuário
                            </h4>

                            <button
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>

                        <div className="modal-body p-4">

                            <form onSubmit={handleCreateUser}>

                                {/* Email */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control rounded-3"
                                        placeholder="Digite o email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                {/* Senha */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Senha
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control rounded-3"
                                        placeholder="Digite a senha"
                                        value={senha}
                                        onChange={(e) =>
                                            setSenha(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                {/* Roles */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold d-block mb-3">
                                        Roles
                                    </label>

                                    <div className="d-flex flex-wrap gap-3">

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

                                </div>

                                {/* Botões */}
                                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                />
                                                Criando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-plus-circle me-2"></i>
                                                Criar Usuário
                                            </>
                                        )}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            <SuccessModal
                show={showSuccess}
                message={successMessage}
                onClose={() => {
                    setShowSuccess(false);
                    onClose();
                }}
            />
        </>
    );
}