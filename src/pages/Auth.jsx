import { useState } from "react";

import LoginForm from "../components/LoginForm";

import RegisterForm from "../components/RegisterForm";

export default function Auth() {

    const [isLogin, setIsLogin] = useState(true);

    return (

        

        <main role="main" className="flex-shrink-0">

            <div className="container">

                <div className="row justify-content-md-center">

                    <div className="col-md-4">

                        <div className="modal modal-sheet position-static d-block p-4 py-md-5" role="dialog"> 

                            <div className="modal-dialog"> 

                                <div className="modal-content rounded-4 shadow">

                                    <div className="modal-header p-5 pb-4 border-bottom-0">

                                        <h1 className="fw-bold mb-0 fs-2 mt-2 mb-2">{isLogin ? "Login" : "Criar Conta"}</h1>

                                    </div>

                                    {isLogin ? (
                                        <LoginForm setIsLogin={setIsLogin} />
                                    ) : (
                                        <RegisterForm setIsLogin={setIsLogin} />
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            

        </main>
    );
}