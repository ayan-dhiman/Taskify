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

    const navigateTo = (path) => {
        navigate(path);
    };

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

    const handleNext = () => {
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
        setLoading(true);
        console.log(name, email, password, role);
        axios.post('http://localhost:8080/auth/register', { name, email, password, role })
            .then(response => {
                setLoading(false);
                navigateTo("/login");
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
                                <Typography>All steps completed - you&apos;re finished</Typography>
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