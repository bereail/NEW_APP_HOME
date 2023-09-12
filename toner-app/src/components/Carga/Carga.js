import React, { useState, useEffect } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import 'bootstrap/dist/css/bootstrap.min.css';
import Basic from '../Toast/Toast';
import 'react-toastify/dist/ReactToastify.css';
import NavbarCustom from '../Navbar/NavbarCustom';
import { ToastContainer } from "react-toastify";

const Carga = () => {
  const [cargaData, setCargaData] = useState({
    idUser: 1,
    idToner: 0,
    idService: 0,
    cargaAt: new Date().toISOString(),
    cant: 0,
    tonerName: '',
  });

  const [toners, setToners] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7293/api/Toner/toners')
      .then((response) => response.json())
      .then((data) => setToners(data))
      .catch((error) => console.error('Error:', error));

    fetch('https://localhost:7293/api/Service/service')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleTonerChange = (id) => {
    const selectedToner = toners.find((toner) => toner.id === id);
    if (selectedToner) {
      setCargaData({
        ...cargaData,
        idToner: id,
        tonerName: selectedToner.name,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!cargaData.idToner || cargaData.idToner <= 0) {
      Basic.notifyError('Debes seleccionar un toner válido.');
      return;
    }
  
    if (!cargaData.idService) {
      Basic.notifyError('Debes seleccionar un servicio.');
      return;
    }
  
    if (cargaData.cant <= 0) {
      Basic.notifyError('La cantidad debe ser mayor que cero.');
      return;
    }
  
    if (cargaData.tonerName.trim() === '' || cargaData.tonerName <= 0) {
      Basic.notifyError('El campo de nombre no puede estar vacío.');
      return;
    }
  
    console.log('Data to be sent:', cargaData);
    
    fetch('https://localhost:7293/api/Carga/cargas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cargaData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Response from server:', data);
        Basic.notifySuccess('Carga creada correctamente');

        //actualizar la pagina
        setTimeout(() => {
          window.location.reload();
        }, 1000 );
      })
      .catch((error) => {
        console.error('Error al crear la carga:', error);
        Basic.notifyError('Error al crear la carga');
      });
  };
  
  
  return (
    <div className="carga-page">
      <NavbarCustom />
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center carga-container">
        <div className="card p-4 carga-card">
          <h1 className="text-center mb-4">Crear Carga</h1>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <label className="form-label">
                Toner:
                <CustomSelect
                  options={toners}
                  value={cargaData.idToner}
                  onChange={handleTonerChange}
                />
              </label>
              <label className="form-label">
                Servicio:
                <CustomSelect
                  options={services}
                  value={cargaData.idService}
                  onChange={(id) => setCargaData({ ...cargaData, idService: id })}
                />
              </label>
            </div>

            <label className="form-label">
              Cantidad:
              <input
                type="number"
                className="form-control"
                value={cargaData.cant}
                onChange={(e) =>
                  setCargaData({ ...cargaData, cant: parseInt(e.target.value, 10) })
                }
              />
            </label>

            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Carga;