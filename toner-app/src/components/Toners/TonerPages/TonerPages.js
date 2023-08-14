import React, { useEffect, useState } from 'react';
import './TonerPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TonerPage = () => {
  const [toners, setToners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Realizar la solicitud GET a la API para obtener los toners
    fetch('https://localhost:7293/api/Toner/toners')
      .then(response => response.json())
      .then(data => setToners(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDeleteToner = (id) => {
    // Realizar la solicitud DELETE a la API para eliminar el toner
    fetch(`https://localhost:7293/api/Toner/toners/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Actualizar el estado después de eliminar el toner
          setToners(prevToners => prevToners.filter(toner => toner.id !== id));
        } else {
          console.error('Error:', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleEditToner = (id) => {
    // Redirigir a la página de edición del toner
    navigate(`/editToner/${id}`);
  };

  const handleAddQuantity = (id) => {
    const updatedToner = toners.find(toner => toner.id === id);
    const newStock = updatedToner.stock + 1;

    // Realizar la solicitud PUT a la API para actualizar el stock del toner
    fetch(`https://localhost:7293/api/Toner/toners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedToner.name, stock: newStock }),
    })
      .then(response => response.json())
      .then(data => {
        // Actualizar el estado después de modificar el stock del toner
        setToners(prevToners =>
          prevToners.map(toner => (toner.id === id ? { ...toner, stock: newStock } : toner))
        );
      })
      .catch(error => console.error('Error:', error));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredToners = toners.filter((toner) => {
    return toner.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="toner-page">
      <h1>Toners:</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
        />
        {filteredToners.map(toner => (
          <div key={toner.id}>
            <span>Toner: {toner.name}, Cantidad: {toner.stock}</span>
            <FontAwesomeIcon icon={faEdit} onClick={() => handleEditToner(toner.id)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteToner(toner.id)} />
            <button onClick={() => handleAddQuantity(toner.id)}>Agregar Cantidad</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TonerPage;
