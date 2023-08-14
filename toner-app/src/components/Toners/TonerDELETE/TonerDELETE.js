import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TonerDELETE = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteToner = () => {
    // Realizar la solicitud DELETE a la API para eliminar el toner
    fetch(`https://localhost:7293/api/TonerStore/toners/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Redirigir a la lista de toners después de eliminar
          navigate('/toners');
        } else {
          console.error('Error:', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>¿Estás seguro de que deseas eliminar este Toner?</h2>
      <button onClick={handleDeleteToner}>Eliminar</button>
    </div>
  );
};

export default TonerDELETE;
