import React from 'react';
import '../../Style/ProgressBar.scss';

const ProgressBar = ({ completedProgress, inProgressProgress }) => {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar completed" style={{ width: `${completedProgress}%` }}>
                
            </div>
            <div className="progress-bar in-progress" style={{ width: `${inProgressProgress}%` }}>
                
            </div>
        </div>
    );
};

export default ProgressBar;
