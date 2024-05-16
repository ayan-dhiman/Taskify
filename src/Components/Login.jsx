import { Button, LinearProgress, Snackbar, SnackbarContent } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Login.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackBar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiUrl = process.env.REACT_APP_API_URL;
    const authUrl = process.env.REACT_APP_AUTH_URL;


    const handleClick = (message) => {
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const fetchUserDetails = (token) => {

        axios.get(`${apiUrl}/users/email/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(userResponse => {
            const userDetails = userResponse.data;
            console.log('User Details:', userDetails);
            dispatch({ type: 'SET_USER', payload: userDetails });
            navigate("/dashboard");
        })
        .catch(userError => {
            console.error('Error fetching user details:', userError.message);
        });

    }

    const handleSignIn = () => {

        if (!email || !password) {
            handleClick('Email and password both are required');
            return;
        }

        if (!email.includes('@')) {
            handleClick('Invalid email format');
            return;
        }

        setOpenSnackBar(false);
        setLoading(true);
        const requestData = {
            email: email,
            password: password
        };

        axios.post(`${authUrl}/login`, requestData)
            .then(response => {
                setLoading(false);
                const token = response.data.token;
                console.log('Token:', token);
                dispatch({ type: 'SET_TOKEN', payload: token });
                fetchUserDetails(token);
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    if (error.response.status === 401) {
                        handleClick('Unauthorized: Please enter a valid email and password.');
                    } else {
                        console.error('Server Error:', error.response.data);
                        handleClick('An error occurred while processing your request. Please try again later.');
                    }
                } else if (error.request) {
                    console.error('Network Error:', error.request);
                    handleClick('Network Error: Please check your internet connection.');
                } else {
                    console.error('Error:', error.message);
                    handleClick('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div className='loginContainer' >
            {loading && <LinearProgress className='lProgress' />}

            <div className="logindiv">
                <div className="headerContainer">
                    <h1>Sign in to Taskify</h1>
                </div>

                <div className="loginBox">

                    <div className="elabel">Registered Email ID</div>
                    <input type="email" value={email} onChange={handleEmailChange} />

                    <div className="paswdLableContainer">
                        <div className="plabel">Password</div>
                        <Link className='link'>Forgot Password !</Link>
                    </div>
                    <input type="password" value={password} onChange={handlePasswordChange} />

                    <Button variant='outlined' onClick={handleSignIn} >Sign In</Button>

                </div>

                <div className='footerNote'>New to Taskify ? <Link className='link' to='/register' >Create an Account</Link></div>

            </div>

            <Snackbar className='snackbar'
                open={openSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={handleClose}>
                <SnackbarContent
                    style={{
                        fontSize: '12px',
                        fontFamily: 'Raleway',
                        minWidth: 'fit-content'
                    }}
                    message={snackbarMessage}
                />
            </Snackbar>

        </div>
    )
}

export default Login