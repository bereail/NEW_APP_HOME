import React from 'react';

const SelectList = ({ label, options, selectedValue, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <select value={selectedValue} onChange={onChange}>
        <option value="">Selecciona una opción</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectList;
