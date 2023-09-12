import React, { useEffect, useState } from 'react';
import './TonerPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



const TonerPage = () => {
  const [toners, setToners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Realizar la solicitud GET a la API para obtener los toners
    fetch('https://localhost:7293/api/TonerStore/toners')
      .then(response => response.json())
      .then(data => setToners(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDeleteToner = (id) => {
    // Realizar la solicitud DELETE a la API para eliminar el toner
    fetch(`https://localhost:7293/api/TonerStore/toners/${id}`, {
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
    // Realizar la solicitud PUT a la API para agregar más cantidad al toner
    // Implementar la lógica para agregar más cantidad al toner
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
        {/* Agregar iconos de acción aquí */}
        {filteredToners.map(toner => (
          <div key={toner.id}>
            <span>Toner: {toner.name}, Cantidad: {toner.cant}</span>
            <FontAwesomeIcon icon={faEdit} onClick={() => handleEditToner(toner.id)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteToner(toner.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TonerPage;