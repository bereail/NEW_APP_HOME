// PrivateComponent.js
import React from 'react';
import { useAuth } from './AuthContext';

const PrivateComponent = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>¡Bienvenido! Estás autenticado.</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <p>Por favor, inicia sesión.</p>
      )}
    </div>
  );
};
 export default PrivateComponent;