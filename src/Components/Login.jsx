import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, LinearProgress } from '@mui/material';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { UseLogin } from '../Hooks/UseLogin';
import useAlert from '../Hooks/UseAlert';

import '../Style/Login.scss';

function Login() {
    const theme = useSelector(state => state.theme.theme);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = UseLogin();
    const alert = useAlert();

    const handleSignIn = async () => {

        dispatch({ type: 'SET_OPEN', payload: false });

        if (!email || !password) {
            alert('Email and password both are required');
            return;
        }

        if (!email.includes('@')) {
            alert('Invalid email format');
            return;
        }

        setLoading(true);

        try {
            await login({ email, password });
            navigate('/dashboard');
            dispatch({ type: 'SET_OPEN', payload: false });
        } catch (error) {
            handleLoginError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginError = (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                alert('Unauthorized: Please enter a valid email and password.');
            } else {
                alert('An error occurred while processing your request. Please try again later.');
            }
        } else if (error.request) {
            alert('Network Error: Please check your internet connection.');
        } else {
            alert('An error occurred. Please try again later.');
        }
    };

    const handleTheme = () => {
        dispatch({ type: 'SET_THEME' });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSignIn();
        }
    };

    const handleCapsLockToggle = (event) => {
        if (event.getModifierState('CapsLock')) {
            setCapsLockOn(true);
        } else {
            setCapsLockOn(false);
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [email, password]);

    useEffect(() => {
        const passwordInput = document.querySelector('input[type="password"]');
        passwordInput.addEventListener('keydown', handleCapsLockToggle);
        passwordInput.addEventListener('keyup', handleCapsLockToggle);

        return () => {
            passwordInput.removeEventListener('keydown', handleCapsLockToggle);
            passwordInput.removeEventListener('keyup', handleCapsLockToggle);
        };
    }, []);

    return (
        <div className={`loginContainer ${theme}`}>
            {loading && <LinearProgress className='lProgress' sx={{
                '.css-5ir5xx-MuiLinearProgress-bar1': {
                    backgroundColor: (theme === 'light' ? '#2a91eb' : '#5a4c8d')
                },
                '.css-1r8wrcl-MuiLinearProgress-bar2': {
                    backgroundColor: (theme === 'light' ? '#2a91eb' : '#5a4c8d')
                }
            }} />}
            <Alert severity="warning" className='warning' >TASKIFY is hosted on a shared server. As a result, it may take a moment for the initial action to respond. After that, you can expect a smoother experience. Thank you for your patience and understanding.</Alert>

            <ContrastOutlinedIcon className='themeIcon' onClick={handleTheme} />

            <div className={`logindiv ${theme}`}>
                <div className={`headerContainer ${theme}`}>
                    <h1>Sign in to Taskify</h1>
                </div>

                <div className={`loginBox ${theme}`}>
                    <div className="elabel">Registered Email ID</div>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`input ${theme}`}
                    />

                    <div className="paswdLableContainer">
                        <div className="plabel">Password</div>
                        <Link className='link' to="/forgot-password">Forgot Password!</Link>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`input ${theme}`}
                    />

                    {capsLockOn ? <p className='capsInfo'>Capslock is on</p> : ''}

                    <Button
                        variant='outlined'
                        onClick={handleSignIn}
                        className={`Button ${theme}`}
                    >
                        Sign In
                    </Button>
                </div>

                <div className='footerNote'>
                    New to Taskify? <Link className='link' to='/register'>Create an Account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;