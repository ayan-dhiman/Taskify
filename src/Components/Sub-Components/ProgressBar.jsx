import React from 'react';
import '../../Style/ProgressBar.scss';

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar"
                style={{ '--progress-width': progress, 'width': progress }}
            >
            </div>
        </div>
    );
};

export default ProgressBar;
