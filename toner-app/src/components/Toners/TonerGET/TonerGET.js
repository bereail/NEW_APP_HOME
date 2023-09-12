import React, { useEffect, useState } from 'react';
import './TonerGET.css';

const TonerGET = () => {
  const [toners, setToners] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7293/api/Toner/toners')
      .then(response => response.json())
      .then(data => setToners(data))
      .catch(error => console.error('Error fetching toners:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="title-tonerGET">Lista de Toners</h1>
      {toners.length > 0 ? (
        <div className="toner-list">
          <div className="toner-header">
            <p className="toner-name">Toner</p>
            <p className="toner-stock">Stock</p>
          </div>
          {toners.map(item => (
            <div key={item.id} className="toner-item">
              <p className="toner-name">{item.name}</p>
              <p className="toner-stock">{item.stock}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-toners">No se encontraron toners en la base de datos</p>
      )}
    </div>
  );
};

export default TonerGET;
