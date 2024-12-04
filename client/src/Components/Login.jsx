import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography } from "@mui/material";
import "./Login.css"; 

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", { email, password }, { withCredentials: true })
            .then(result => {
                if (result.data === "Success") {
                    axios.get('http://localhost:3001/user', { withCredentials: true })
                        .then(response => {
                            if (response.data.user) {
                                setIsLoggedIn(true);
                                navigate("/home", { state: { user: response.data.user } });
                            }
                        });
                } else {
                    alert("Login failed");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-wrapper">
            <Grid container justifyContent="center" alignItems="center">
                <Paper className="login-paper">
                    <Typography component="h1" variant="h5" className="login-heading">Login</Typography>
                    <form onSubmit={handleLogin}>
    <div className="login-row">
        <TextField 
            fullWidth 
            variant="outlined" 
            type="email" 
            placeholder="Enter Email" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)} 
            className="login-input"
            InputProps={{ style: { color: "white" } }}
        />
    </div>
    <div className="login-row">
        <TextField 
            fullWidth 
            variant="outlined" 
            type="password" 
            placeholder="Enter Password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)} 
            className="login-input"
            InputProps={{ style: { color: "white" } }}
        />
    </div>
    <div className="login-row">
        <Button variant="contained" type="submit" className="login-button">Login</Button>
    </div>
</form>

                    <Typography variant="body2" className="signup-link">
                        Don't have an account? <Link href="/signup">Sign Up</Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;
