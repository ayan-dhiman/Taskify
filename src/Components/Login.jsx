import { Alert, Button, LinearProgress, Snackbar, SnackbarContent } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Login.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

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
    const theme = useSelector(state => state.theme.theme);

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
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
            dispatch({ type: 'SET_USER', payload: userDetails });
            navigate("/dashboard");
        })
        .catch(userError => {
            console.error('Error fetching user details:', userError.message);
        });

    }

    const handleSignIn = () => {

        if (!email || !password) {
            alert('Email and password both are required');
            return;
        }

        if (!email.includes('@')) {
            alert('Invalid email format');
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
                        alert('Unauthorized: Please enter a valid email and password.');
                    } else {
                        console.error('Server Error:', error.response.data);
                        alert('An error occurred while processing your request. Please try again later.');
                    }
                } else if (error.request) {
                    console.error('Network Error:', error.request);
                    alert('Network Error: Please check your internet connection.');
                } else {
                    console.error('Error:', error.message);
                    alert('An error occurred. Please try again later.');
                }
            });
    };

    const handleTheme = () => {
        dispatch({ type: 'SET_THEME'});
    }

    return (
        <div className={`loginContainer ${theme === 'light' ? 'light' : 'dark'}`} >
            {loading && <LinearProgress className='lProgress' />}
            <ContrastOutlinedIcon className='themeIcon' onClick={handleTheme} />

            <div className={`logindiv ${theme === 'light' ? 'light' : 'dark'}`}>
                <div className={`headerContainer ${theme === 'light' ? 'light' : 'dark'}`}>
                    <h1>Sign in to Taskify</h1>
                </div>

                <div className={`loginBox ${theme === 'light' ? 'light' : 'dark'}`}>

                    <div className="elabel">Registered Email ID</div>
                    <input type="email" value={email} onChange={handleEmailChange} className={`input ${theme === 'light' ? 'light' : 'dark'}`} />

                    <div className="paswdLableContainer">
                        <div className="plabel">Password</div>
                        <Link className='link'>Forgot Password !</Link>
                    </div>
                    <input type="password" value={password} onChange={handlePasswordChange} className={`input ${theme === 'light' ? 'light' : 'dark'}`} />

                    <Button variant='outlined' onClick={handleSignIn} className={`Button ${theme === 'light' ? 'light' : 'dark'}`} >Sign In</Button>

                </div>

                <div className='footerNote'>New to Taskify ? <Link className='link' to='/register' >Create an Account</Link></div>

            </div>

        </div>
    )
}

export default Login