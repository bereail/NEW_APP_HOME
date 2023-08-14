import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CustomSelect.css';

const CustomSelect = ({ options, value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListOpen, setListOpen] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOptionMouseEnter = (id) => {
    setHighlightedOption(id);
  };

  const handleOptionMouseLeave = () => {
    setHighlightedOption(null);
  };

  const handleOutsideClick = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setListOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setListOpen(true);
  };

  const handleOptionClick = (id, name) => {
    onChange(id);
    setSelectedOption(name);
    setListOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={selectRef} className="custom-select-container">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={selectedOption || searchTerm}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <span
            className="input-group-text"
            onClick={() => setListOpen(!isListOpen)}
          >
            <i className={`bi bi-chevron-${isListOpen ? 'up' : 'down'}`} />
          </span>
        </div>
      </div>
      {isListOpen && (
        <ul className="custom-select-options list-group">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className={`list-group-item ${
                highlightedOption === option.id ? 'highlighted' : ''
              }`}
              onClick={() => handleOptionClick(option.id, option.name)}
              onMouseEnter={() => handleOptionMouseEnter(option.id)}
              onMouseLeave={handleOptionMouseLeave}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
