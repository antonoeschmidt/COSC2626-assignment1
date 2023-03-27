import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export type NavbarProps = {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
};

const Navbar = (props: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Music at RMIT
                    </Typography>
                    {props.loggedIn ? (
                        <div>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/")}
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    props.setLoggedIn(false);
                                    navigate("/login");
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
