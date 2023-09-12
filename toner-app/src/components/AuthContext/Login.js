// LoginComponent.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginComponent = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de validación y llamada a la función login del contexto
    if (username === 'user' && password === 'pass') {
      login();
    }
  };

  return (
    <div>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};


export default LoginComponent;