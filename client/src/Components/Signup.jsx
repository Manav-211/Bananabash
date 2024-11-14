import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography } from "@mui/material";
import "./SignUp.css"; // Import the CSS file

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/signup", { name, email, password })
            .then(result => {
                if (result.status === 201) {
                    navigate("/login");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    window.alert("Email already exists. Please use a different email.");
                } else {
                    console.log(err);
                }
            });
    };

    return (
        <div className="signup-wrapper">
            <Grid align="center">
                <Paper className="signup-paper" sx={{
                    width: {
                        xs: '80vw', sm: '50vw', md: '40vw', lg: '30vw', xl: '20vw'
                    },
                    height: { lg: '60vh' }
                }}>
                    <Typography component="h1" variant="h5" className="signup-heading">Signup</Typography>
                    <form onSubmit={handleSignup}>
                        <TextField 
                            className="signup-input"
                            fullWidth
                            type="text"
                            label="Enter Name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField 
                            className="signup-input"
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />                    
                        <TextField 
                            className="signup-input"
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className="signup-button" variant="contained" type="submit">SignUp</Button>
                    </form>
                    <p className="signup-login-text">
                        Already have an account? <Link href="/login">Login</Link>
                    </p>
                </Paper>
            </Grid>
        </div>
    );
}

export default SignUp;
