import { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import isLoggedIn from '../tools/auth';
import { TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, {} from 'react';
import { AuthContext } from '../AuthContext';

axios.defaults.withCredentials = true;

const LOGIN_URL = '/login';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response);
            setEmail('');
            setPwd('');
            login();
            navigate('/');
        } catch (err) {
            console.log("ERROR: " + err);
            if (!err?.response) {
                console.log(err);
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    };

    return (
        <>
            <section>
                <Typography variant="h3">Sign In</Typography>
                {errMsg && (
                    <Typography color="error">
                        {errMsg}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Sign In
                    </Button>
                </form>
                <Typography variant="body1">
                    Need an Account?<br />
                    <MuiLink component={RouterLink} to="/register">Sign Up</MuiLink>
                </Typography>
            </section>
        </>
    );
};

export default Login;
