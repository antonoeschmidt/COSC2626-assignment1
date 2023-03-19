import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { User } from "./models/User";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User>()

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar loggedIn={loggedIn}/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute loggedIn={loggedIn}>
                                <MainPage user={user} setUser={setUser}/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                                setUser={setUser}
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
