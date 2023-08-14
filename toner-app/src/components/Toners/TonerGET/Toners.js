import React, { useEffect, useState } from 'react';


const Toners = () => {
  const [toners, setToners] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a la API para obtener los toners
    fetch('https://localhost:7293/api/Toner/toners')
      .then(response => response.json())
      .then(data => setToners(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Toners</h1>
      <ul>
        {toners.map(item => (
          <li key={item.id}>
            Toner: {item.name}, Cantidad: {item.cant}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toners;
