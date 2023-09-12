import React, { useEffect, useState } from 'react';
import './TonerPUT.css';
import NavbarCustom from '../../Navbar/NavbarCustom';
import Basic from '../../Toast/Toast';
import { ToastContainer } from 'react-toastify';

const TonerPUT = () => {
  const [toners, setToners] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchedToner, setSearchedToner] = useState(null);
  const [newStock, setNewStock] = useState('');

  useEffect(() => {
    fetch('https://localhost:7293/api/Toner/toners')
      .then(response => response.json())
      .then(data => setToners(data))
      .catch(error => console.error('Error fetching toners:', error));
  }, []);

  const handleSearchInputChange = event => {
    setSearchName(event.target.value);
  };

  const handleSearchTonerByName = () => {
    if (!searchName) {
      Basic.notifyError('Por favor ingresa un nombre de toner.');
      return;
    }

    const foundToner = toners.find(toner => toner.name === searchName);

    if (foundToner) {
      setSearchedToner(foundToner);
      console.log('Toner found by name');
    } else {
      Basic.notifyError(`No se encontró un toner con el nombre: ${searchName}`);
      setSearchedToner(null);
    }
  };

  const handleUpdateStock = () => {
    const updatedToner = {
      id: searchedToner.id,
      name: searchedToner.name,
      cant: 0,
      stock: parseInt(newStock),
    };
  
    console.log("JSON a enviar:", JSON.stringify(updatedToner));
  
    if (updatedToner.stock < 0) {
      Basic.notifyError('La cantidad no puede ser menor que 0');
      return;
    }
  
    fetch(`https://localhost:7293/api/Toner/toners/${searchedToner.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedToner),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(updatedTonerResponse => {
        Basic.notifySuccess('Toner updated successfully');
        const updatedToners = toners.map(toner => {
          if (toner.id === updatedTonerResponse.id) {
            return { ...toner, stock: updatedTonerResponse.stock };
          }
          return toner;
        });
        setToners(updatedToners);
      })
      .catch(error => {
        Basic.notifyError(`Error updating toner stock: ${error}`);
      });
  };

  return (
    <div>
      <NavbarCustom />
      <ToastContainer />
      <div className="container">
        <h1 className="title-tonerPUT">Editar Toners</h1>
        <div className="search-box">
          <input
            type="text"
            value={searchName}
            onChange={handleSearchInputChange}
            placeholder="Nombre del toner a buscar"
          />
          <button onClick={handleSearchTonerByName}>Buscar</button>
        </div>
        <h2>Lista de Toners</h2>
        {toners.length > 0 ? (
          <div className="toner-list">
            <div className="toner-header">
              <p className="toner-name">Toner</p>
              <p className="toner-stock">Stock</p>
            </div>
            {toners.map(item => (
              <div key={item.id} className="toner-item">
                <p className="toner-name">{item.name}</p>
                <p className="toner-stock">{item.stock}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-toners">No se encontraron toners en la base de datos</p>
        )}

        {searchedToner && (
          <div className="searched-toner">
            <h2>Toner encontrado por Nombre</h2>
            <p>ID: {searchedToner.id}</p>
            <p>Nombre: {searchedToner.name}</p>
            <p>Stock: {searchedToner.stock}</p>
            <div>
              <input
                type="number"
                value={newStock}
                onChange={e => setNewStock(e.target.value)}
                placeholder="Nuevo Stock"
              />
              <button onClick={handleUpdateStock} disabled={!newStock}>
                Actualizar Stock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TonerPUT;
