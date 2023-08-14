import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('https://localhost:7293/api/Users/users', { // Corrige la ubicación de la llave de apertura
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate('/home'); // Cambia '/home' por la ruta de tu página de inicio.
        } else {
          // Si las credenciales son inválidas, mostrar un mensaje de error
          alert('Credenciales inválidas. Inténtalo de nuevo.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
