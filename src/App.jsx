import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Auth />}
            />

            <Route
                path="/home"
                element={
                    <>
                        <Header />
                        <Home />
                        <Footer />
                    </>
                }
            />

            <Route
                path="/users"
                element={
                    <>
                        <Header />
                        <Users />
                        <Footer />
                    </>
                }
            />

            <Route
                path="/profile"
                element={
                    <>
                        <Header />
                        <Profile />
                        <Footer />
                    </>
                }
            />

        </Routes>

    );
}

export default App;