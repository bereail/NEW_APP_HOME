import React, { useState } from 'react';

const ServicesPost = () => {
  const [serviceData, setServiceData] = useState({
    id: 0,
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://localhost:7293/api/Service/service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Nuevo servicio agregado:', data);
        // Si el servicio se ha agregado exitosamente, puedes hacer alguna acción adicional aquí.
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Agregar Nuevo Servicio</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="number" value={serviceData.id} onChange={e => setServiceData({ ...serviceData, id: e.target.value })} />
        </label>
        <br />
        <label>
          Nombre del Servicio:
          <input type="text" value={serviceData.name} onChange={e => setServiceData({ ...serviceData, name: e.target.value })} />
        </label>
        <br />
        <button type="submit">Agregar Servicio</button>
      </form>
    </div>
  );
};

export default ServicesPost;
