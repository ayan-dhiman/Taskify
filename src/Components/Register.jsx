import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, LinearProgress, Snackbar, SnackbarContent, Stepper, Step, StepLabel, Typography } from '@mui/material';
import axios from 'axios';
import '../Style/Register.scss';

function Register() {
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const steps = ['Name', 'Email', 'Password', 'Role'];
    const navigate = useNavigate();
    
    const apiUrl = process.env.REACT_APP_API_URL;
    const authUrl = process.env.REACT_APP_AUTH_URL;

    const handleClick = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const validateInput = async () => {

        if (activeStep === 0) {
            if (!name.trim()) {
                handleClick('Name cannot be blank');
                return false;
            }
            if (!name.match(/^[a-zA-Z\s]+$/)) {
                handleClick('Name should only contain alphabets');
                return false;
            }
        } else if (activeStep === 1) {
            if (!email.trim()) {
                handleClick('Email cannot be blank');
                return false;
            }
            if (!email.match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)) {
                handleClick('Please enter a valid email address');
                return false;
            }
            const isEmailRegistered = await verifyEmail(email);
            if (isEmailRegistered) {
                handleClick('Email is already registered!');
                return false;
            }
        } else if (activeStep === 2) {
            if (!password.trim()) {
                handleClick('Password cannot be blank');
                return false;
            }
            if (password.trim().length < 6) {
                handleClick('Password must be at least 6 characters long');
                return false;
            }
        } else if (activeStep === 3) {

            if (!role.trim()) {
                handleClick('Please select a role');
                return false;
            }
        }
        return true;
    };

    const handleNext = async () => {
        setOpenSnackbar(false);
        const value = await validateInput();
        if (!value) {
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleRegister = () => {

        if (!validateInput()) {
            return;
        }

        setLoading(true);
        console.log(name, email, password, role);
        axios.post(`${authUrl}/register`, { name, email, password, role })
            .then(response => {
                setLoading(false);
                navigate("/login");
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    handleClick('Error: ' + error.response.data.message);
                } else if (error.request) {
                    handleClick('Network Error: Please check your internet connection');
                } else {
                    handleClick('An error occurred. Please try again later');
                }
            });
    };

    const verifyEmail = async (email) => {
        setLoading(true);
        try {
            const response = await axios.get(`${authUrl}/verifyemail?email=${email}`);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            if (error.response) {
                handleClick('Error: ' + error.response.data.message);
            } else if (error.request) {
                handleClick('Network Error: Please check your internet connection');
            } else {
                handleClick('An error occurred. Please try again later');
            }
            return false;
        }
    };

    return (
        <div className='registerContainer' >

            {loading && <LinearProgress className='lProgress' />}

            <div className="registerBox">

                <div className="headerContainer">

                    <h1>Register to Taskify</h1>

                </div>

                <div className="bodyContainer">

                    <Stepper activeStep={activeStep} alternativeLabel className='registerStepper' >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel></StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography>All steps completed - you&apos;re Registered</Typography>
                            </div>
                        ) : (
                            <div className='inputContainer' >
                                <div className='label' >Enter your {steps[activeStep]}</div>
                                <div className='inputs'>
                                    {activeStep === 0 && <input type="text" value={name} onChange={handleNameChange} />}
                                    {activeStep === 1 && <input type="text" value={email} onChange={handleEmailChange} />}
                                    {activeStep === 2 && <input type="password" value={password} onChange={handlePasswordChange} />}
                                    {activeStep === 3 && (
                                        <select value={role} onChange={handleRoleChange} className='select' >
                                            <option value="">Select Role</option>
                                            <option value="DSM Lead">DSM Lead</option>
                                            <option value="DSM Member">DSM Member</option>
                                        </select>
                                    )}
                                </div>
                                <div className='buttons' >
                                    <Button disabled={activeStep === 0} onClick={handleBack} className='button' >Back</Button>
                                    <Button variant="contained" className='containedButton' color="primary" onClick={activeStep === steps.length - 1 ? handleRegister : handleNext}>
                                        {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='footerNote' >
                        Already Have an Account?   <Link to="/login" className='link' >  Sign In</Link>
                    </div>

                </div>

            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
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
    );
}

export default Register;