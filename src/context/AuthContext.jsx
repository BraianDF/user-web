import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    async function loadUser() {
        try {
            const response = await api.get("/users/me");
            setUser(response.data);
        } catch {
            logout();
        }
    }

    async function login(email, senha) {
        const response = await api.post("/auth/login", {
            email,
            senha
        });

        localStorage.setItem("token", response.data.token);
        await loadUser();
    }

    async function register(email, senha) {
        await api.post("/auth/register", {
            email,
            senha
        });
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            loadUser();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                loadUser 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}