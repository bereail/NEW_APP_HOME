import React, { useEffect, useState } from 'react';

const Toners = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a la API
    fetch('https://localhost:7293/api/TonerStore/toners')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Frontend de React consumiendo una API en C#</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            ID: {item.id}, Nombre: {item.name}, Cantidad: {item.cant}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toners;
