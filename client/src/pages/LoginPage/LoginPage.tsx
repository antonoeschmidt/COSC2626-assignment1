import { Button, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export type LoginPageProps = {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const LoginPage = (props: LoginPageProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = async () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.status !== 200) {
            alert("Email or password is incorrect");
            console.log(data);
            return;
        }
        props.setLoggedIn(true);
        navigate("/");
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                onClick={() => handleClick()}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
        </div>
    );
};

export default LoginPage;
