import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

import '../Style/SecurityAlert.scss';

function SecurityAlert() {
    const theme = useSelector(state => state.theme.theme);

    const dispatch = useDispatch();

    const handleTheme = () => {
        dispatch({ type: 'SET_THEME' });
    };

    return (
        <div className={`sacontainer ${theme}`}>
            
            <ContrastOutlinedIcon className='themeIcon' onClick={handleTheme} />

            <div className={`logindiv ${theme}`}>
                <div className={`headerContainer ${theme}`}>
                    <h1>Security Alert</h1>
                </div>

                <div className={`loginBox ${theme}`}>
                    <div className="prompt">Please Sign In again to continue accessing TASKIFY.</div>
                </div>

                <div className='footerNote'>
                   <Link className='link' to='/login'>Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default SecurityAlert ;