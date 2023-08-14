import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory

const UsersList = () => {
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory
  const [users, setUsers] = useState([]);
  const authenticated = true; // Define la variable authenticated según tu lógica de autenticación

  useEffect(() => {
    // Realizar la solicitud GET a la API solo si el usuario está autenticado.
    if (authenticated) {
      fetch('https://localhost:7293/api/Users/users')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error:', error));
    } else {
      // Si el usuario no está autenticado, redirige al componente de login.
      navigate('/login'); // Cambia '/login' por la ruta de tu página de login.
    }
  }, [authenticated, navigate]);

  const handleEditUser = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            User: {user.name}, Rol: {user.idRol}
            <button onClick={() => handleEditUser(user.id)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleDeleteUser(user.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
