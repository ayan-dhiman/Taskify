import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, LinearProgress, Stepper, Step, StepLabel, Typography } from '@mui/material';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

import { UseAddUser } from '../Hooks/UseAddUser';
import useAlert from '../Hooks/UseAlert';
import { UseVerifyEmail } from '../Hooks/UseVerifyEmail';

import '../Style/Register.scss';

function Register() {
    const theme = useSelector(state => state.theme.theme);

    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const steps = ['Name', 'Email', 'Password'];
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addUser = UseAddUser();
    const verifyEmail = UseVerifyEmail();
    const alert = useAlert();

    const handleTheme = () => {
        dispatch({ type: 'SET_THEME' });
    };

    const validateInput = async () => {
        switch (activeStep) {
            case 0:
                if (!name.trim()) {
                    alert('Name cannot be blank');
                    return false;
                }
                if (!name.match(/^[a-zA-Z\s]+$/)) {
                    alert('Name should only contain alphabets');
                    return false;
                }
                break;
            case 1:
                if (!email.trim()) {
                    alert('Email cannot be blank');
                    return false;
                }
                if (!email.match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)) {
                    alert('Please enter a valid email address');
                    return false;
                }
                if (await handleVerifyEmail(email)) {
                    alert('Email is already registered!');
                    return false;
                }
                break;
            case 2:
                if (!password.trim()) {
                    alert('Password cannot be blank');
                    return false;
                }
                if (password.trim().length < 6) {
                    alert('Password must be at least 6 characters long');
                    return false;
                }
                break;
            default:
                break;
        }
        return true;
    };

    const handleNext = async () => {
        dispatch({ type: 'SET_OPEN', payload: false });

        if (await validateInput()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleRegister = async () => {
        if (await validateInput()) {
            setLoading(true);
            try {
                await addUser({ name, email, password });
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                //navigate('/login');
            } catch (error) {
                handleRegisterError(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRegisterError = (error) => {
        if (error.response) {
            const { status } = error.response;
            alert(status === 401 ? 'Unauthorized: Please enter a valid email and password.' : 'An error occurred while processing your request. Please try again later.');
        } else if (error.request) {
            alert('Network Error: Please check your internet connection.');
        } else {
            alert('An error occurred. Please try again later.');
        }
    };

    const handleVerifyEmail = async (email) => {
        setLoading(true);
        try {
            return await verifyEmail(email);
        } catch (error) {
            handleRegisterError(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <input type="text" value={name} onChange={(e) => setName(e.target.value)} />;
            case 1:
                return <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />;
            case 2:
                return <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />;
            default:
                return null;
        }
    };

    return (
        <div className={`registerContainer ${theme}`}>
            {loading && <LinearProgress className='lProgress' sx={{
                '.css-5ir5xx-MuiLinearProgress-bar1': {
                    backgroundColor: (theme === 'light' ? '#2a91eb' : '#5a4c8d')
                },
                '.css-1r8wrcl-MuiLinearProgress-bar2': {
                    backgroundColor: (theme === 'light' ? '#2a91eb' : '#5a4c8d')
                }
            }} />}
            <ContrastOutlinedIcon onClick={handleTheme} />
            <div className="registerBox">
                <div className="headerContainer">
                    <h1>Register to Taskify</h1>
                </div>
                <div className="bodyContainer">
                    <Stepper activeStep={activeStep} alternativeLabel className='registerStepper'>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <Typography>All steps completed - you're Registered</Typography>
                        ) : (
                            <div className='inputContainer'>
                                <div className='label'>Enter your {steps[activeStep]}</div>
                                <div className='inputs'>
                                    {renderStepContent(activeStep)}
                                </div>
                                <div className='buttons'>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className='button'>Back</Button>
                                    <Button variant="contained" className='containedButton' color="primary" onClick={activeStep === steps.length - 1 ? handleRegister : handleNext}>
                                        {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='footerNote'>
                        Already Have an Account? <Link to="/login" className='link'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;