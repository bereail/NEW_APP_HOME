import React, { useEffect, useState } from 'react';

const TonerGETID = () => {
  const [data, setData] = useState([]);
  const [tonerId, setTonerId] = useState('');
  const [tonerById, setTonerById] = useState(null);

  useEffect(() => {
    // Realizar la solicitud GET a la API para obtener todos los toners
    fetch('https://localhost:7293/api/Toner/toners')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTonerId(value);
  };

  const handleGetTonerById = () => {
    // Realizar la solicitud GET a la API usando el ID del toner
    fetch(`https://localhost:7293/api/Toner/toners/${tonerId}`)
      .then(response => response.json())
      .then(data => setTonerById(data))
      .catch(error => {
        console.error('Error:', error);
        setTonerById(null);
      });
  };

  return (
    <div>
      <h1>Frontend de React consumiendo una API en C#</h1>
      <h2>Lista de toners:</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            ID: {item.id}, Nombre: {item.name}, Cantidad: {item.cant}
          </li>
        ))}
      </ul>

      <div>
        <h2>Buscar toner por ID:</h2>
        <input
          type="text"
          value={tonerId}
          onChange={handleInputChange}
          placeholder="ID del toner"
        />
        <button onClick={handleGetTonerById}>Buscar</button>
        {tonerById && (
          <div>
            <h3>Toner encontrado:</h3>
            <p>ID: {tonerById.id}, Nombre: {tonerById.name}, Cantidad: {tonerById.cant}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TonerGETID;
