import React, { useState, useEffect } from 'react';
import '../../Style/DateComponent.scss';

const DateComponent = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []); // Run only once when component mounts

    const formattedDate = currentDateTime.toLocaleString('en-US', {
        weekday: 'long', // Full name of the day (e.g., Thursday)
        month: 'long', // Full name of the month (e.g., May)
        day: 'numeric', // Day of the month (e.g., 9)
        year: 'numeric' // Full year (e.g., 2024)
    });

    return (
        <div className="date-container">
            <p>{formattedDate}</p>
        </div>
    );
};

export default DateComponent;
