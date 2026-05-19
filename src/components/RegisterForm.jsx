import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";

export default function RegisterForm({ setIsLogin }) {

    const { register } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [senha, setSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await register(email, senha);

            setSuccessMessage("Conta criada com sucesso!");
            setShowSuccess(true);

        } catch (error) {

            console.error(error);

            setErrorMessage(error.response?.data?.message || "Erro ao cadastrar.");
            setShowModal(true);
        }
    }

    return (

        <>
        <div className="modal-body p-5 pt-0">
                    
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-3" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Email</label>
                </div>

                <div className="input-group mb-3">

                    <div className="form-floating">
                        <input type={mostrarSenha ? "text" : "password"} className="form-control rounded-3" placeholder="senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <label>Senha</label>
                    </div>

                    <button type="button" className="btn btn-outline-secondary" onClick={() => setMostrarSenha(!mostrarSenha)}>
                        <i className={`bi ${mostrarSenha ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>

                </div>

                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Criar Conta</button>

                <hr className="my-4" /> 
                <h2 className="fs-5 fw-bold mb-3">Já possuí uma conta?</h2> 
                <button type="button" onClick={() => setIsLogin(true)} className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3">Fazer Login</button>

            </form>

        </div>

        <ErrorModal show={showModal} message={errorMessage} onClose={() => setShowModal(false)}/>
        <SuccessModal show={showSuccess} message={successMessage} onClose={() => {setShowSuccess(false);setIsLogin(true);}}/>
        </>
    );
}