import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar loggedIn={loggedIn}/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute loggedIn={loggedIn}>
                                <MainPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
