import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, LinearProgress, Stepper, Step, StepLabel, Typography } from '@mui/material';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

import { UseUpdateUser } from '../Hooks/UseUpdateUser';
import useAlert from '../Hooks/UseAlert';
import { UseVerifyEmail } from '../Hooks/UseVerifyEmail';

import '../Style/ForgotPassword.scss';
import { UseResetPassword } from '../Hooks/UseResetPassword';
import { UseValidateOTP } from '../Hooks/UseValidateOTP';
import { UseGenerateOTP } from '../Hooks/UseGenerateOTP';

function ForgotPassword() {
    const theme = useSelector(state => state.theme.theme);

    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [OTP, setOTP] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const steps = ['Registered Email', 'OTP', 'New Password', 'Verify Password'];
    const [capsLockOn, setCapsLockOn] = useState(false);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const updatePassword = UseUpdateUser();
    const verifyEmail = UseVerifyEmail();
    const generateOTP = UseGenerateOTP();
    const validateOTP = UseValidateOTP();
    const resetPassword = UseResetPassword();
    const alert = useAlert();

    const handleTheme = () => {
        dispatch({ type: 'SET_THEME' });
    };

    const validateInput = async () => {
        switch (activeStep) {
            case 0:
                if (!email.trim()) {
                    alert('Email cannot be blank');
                    return false;
                }
                if (!email.match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)) {
                    alert('Please enter a valid email address');
                    return false;
                }
                if (!await handleVerifyEmail(email)) {
                    alert('Email is not registered!');
                    return false;
                }
                break;
            case 1:
                if (!OTP.trim()) {
                    alert('OTP cannot be blank');
                    return false;
                }
                if (OTP.trim().length < 6) {
                    alert('OTP must be at least 6 characters long');
                    return false;
                }
                if (!await validateOTP(email, OTP)) {
                    alert('OTP is not valid');
                    return false;
                }
                break;
            case 2:
                if (!newPassword.trim()) {
                    alert('Password cannot be blank');
                    return false;
                }
                if (newPassword.trim().length < 6) {
                    alert('Password must be at least 6 characters long');
                    return false;
                }
                break;
            case 3:
                if (!verifyPassword.trim()) {
                    alert('Password cannot be blank');
                    return false;
                }
                if (verifyPassword.trim().length < 6) {
                    alert('Password must be at least 6 characters long');
                    return false;
                }
                if (verifyPassword !== newPassword) {
                    alert('Passwords do not match');
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
            if (activeStep === 0) {
                generateOTP(email);
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangePassword = async () => {
        if (await validateInput()) {
            setLoading(true);
            try {
                console.log("OTP - ", OTP);
                await resetPassword({ otp: OTP, email: email, newPassword: newPassword });
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
            alert(status === 401 ? 'Unauthorized' : 'An error occurred while processing your request. Please try again later.');
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
                return <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />;
            case 1:
                return <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} />;
            case 2:
                return <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} ref={passwordRef} />;
            case 3:
                return <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} ref={passwordRef} />;
            default:
                return null;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            activeStep === steps.length - 1 ? handleChangePassword() : handleNext();
        }
        if (event.key === 'Escape' && activeStep !== 0) {
            handleBack();
        }
    };

    const handleCapsLockToggle = (event) => {
        if (event.getModifierState('CapsLock')) {
            setCapsLockOn(true);
        } else {
            setCapsLockOn(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [activeStep, email, newPassword, verifyPassword, OTP]);

    useEffect(() => {
        const passwordInput = passwordRef.current;
        if (passwordInput) {
            passwordInput.addEventListener('keydown', handleCapsLockToggle);
            passwordInput.addEventListener('keyup', handleCapsLockToggle);
        }

        return () => {
            if (passwordInput) {
                passwordInput.removeEventListener('keydown', handleCapsLockToggle);
                passwordInput.removeEventListener('keyup', handleCapsLockToggle);
            }
        };
    }, [passwordRef]);

    return (
        <div className={`forgotPasswordContainer ${theme}`}>
            {loading && <LinearProgress className='lProgress' sx={{
                '.css-5ir5xx-MuiLinearProgress-bar1': {
                    backgroundColor: (theme === 'light' ? '#2a91eb' : '#5a4c8d')
                },
                '.css-1r8wrcl-MuiLinearProgress-bar2': {
                    backgroundColor: (theme === 'light' ? '#2a91eb' : '#5a4c8d')
                }
            }} />}
            <ContrastOutlinedIcon onClick={handleTheme} />
            <div className="fpasswordBox">
                <div className="headerContainer">
                    <h1>Forgot Password</h1>
                </div>
                <div className="bodyContainer">
                    <Stepper activeStep={activeStep} alternativeLabel className='fpasswordStepper'>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div className='completionDiv'>
                                All steps completed - you can sign in with your updated password !
                            </div>
                        ) : (
                            <div className='inputContainer'>
                                <div className='label'>Enter your {steps[activeStep]}</div>
                                <div className='inputs'>
                                    {renderStepContent(activeStep)}
                                </div>
                                {capsLockOn ? <p className='capsInfo'>Capslock is on</p> : ''}
                                <div className='buttons'>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className='button'>Back</Button>
                                    <Button variant="contained" className='containedButton' color="primary" onClick={activeStep === steps.length - 1 ? handleChangePassword : handleNext}>
                                        {activeStep === steps.length - 1 ? 'Change Password' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='footerNote'>
                        {activeStep === steps.length ? <Link to="/login" className='link'>Sign In to your Account</Link> : <><Link to="/login" className='link'>Remembered Your Password?</Link></>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;