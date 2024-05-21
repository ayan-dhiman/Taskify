import React, { useState } from 'react';
import '../../Style/Select.scss'

const Select = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? (
          <>
            <img src={selectedOption.icon} alt="" className="select-icon" />
            {selectedOption.label}
          </>
        ) : (
          "Select an option"
        )}
        <span className="select-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="select-options">
          {options.map((option, index) => (
            <li
              key={index}
              className="select-option"
              onClick={() => handleOptionClick(option)}
            >
              <img src={option.icon} alt="" className="option-icon" />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;