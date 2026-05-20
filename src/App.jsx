import { Routes, Route, Outlet } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {

    return (

        <div className="d-flex flex-column min-vh-100">

            <Header />

            <main className="flex-grow-1 d-flex flex-column">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}

function App() {

    return (

        <Routes>

            {/* Tela sem layout */}
            <Route path="/" element={<Auth />} />

            {/* Rotas com layout */}
            <Route element={<Layout />}>

                <Route path="/home" element={<Home />} />

                <Route path="/users" element={<Users />} />

                <Route path="/profile" element={<Profile />} />

            </Route>

        </Routes>

    );
}

export default App;