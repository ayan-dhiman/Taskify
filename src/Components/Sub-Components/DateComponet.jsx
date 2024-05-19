import React, { useState, useEffect } from 'react';
import '../../Style/DateComponent.scss';
import { useSelector } from 'react-redux';

const DateComponent = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const theme = useSelector(state => state.theme.theme);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []); // Run only once when component mounts

    const formattedDate = currentDateTime.toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className={`date-container ${theme === 'light' ? 'light' : 'dark'}`} >
            <p>{formattedDate}</p>
        </div>
    );
};

export default DateComponent;
