import React, { useState } from "react";
import axios from "../../api/axios";
import Basic from "../Toast/Toast";
import { ToastContainer } from "react-toastify";

const AddUser = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');


  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePassChange = (value) => {
    setPass(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || pass.trim() === '') {
      Basic.notifyError('Error', 'Los campos no pueden estar vacíos');
      return;
    }

    if (pass.length < 6) {
      Basic.notifyError('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const userData = {
      Name: name,
      Pass: pass,
      idRol : 1
    };

    console.log('JSON enviado:', userData);

    axios.post('https://localhost:7293/api/Users/users', userData)
        .then(response => {
            Basic.notifySuccess('Usuario agregado exitosamente: ', response.data)
        })
        .catch(error => {
            Basic.notifyError('Error al agregar usuario: ', error);
        })
  };
  return (
    <div>
      <ToastContainer />
        <h2>Agregar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre de usuario:</label>
            <input type="text" value={name} onChange={e => handleNameChange(e.target.value)} />
          </div>
          <div>
            <label>Contraseña:</label>
            <input type="password" value={pass} onChange={e => handlePassChange(e.target.value)} />
          </div>
          <button type="submit">Agregar Usuario</button>
        </form>
    </div>
  );
}

export default AddUser;
