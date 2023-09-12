import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const handleNameChange = (value) => {
    setName(value);
  }

  const handlePassChange = (value) => {
    setPass(value);
  }

  const handleLogin = () => {
    const data = {
      Name: name,
      Pass: pass,
    };

    const url = "https://localhost:7293/api/Users/login";
    axios.post(url, data)
      .then((result) => {
        if (result.data === 'Login successful') {
          navigate('/');
        } else {
          alert('Credenciales inválidas. Inténtalo de nuevo.');
        }
      })
      .catch((error) => {
        alert('Error al iniciar sesión.');
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => handlePassChange(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}

export default Login;
