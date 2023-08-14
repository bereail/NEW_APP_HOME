import React, { useState, useEffect } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify'; // Importa toast de react-toastify
import 'react-toastify/dist/ReactToastify.css';

const Carga = () => {
  const [cargaData, setCargaData] = useState({
    idUser: 1,
    idToner: 7,
    idService: 1,
    cargaAt: new Date().toISOString(),
    cant: 0,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://localhost:7293/api/Carga/cargas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cargaData),
    })
    .then((response) => response.json())
    .then((data) => {
      alert('Carga creada');
      console.log('Carga creada correctamente', data); // Imprime la respuesta del servidor
      toast.success('Carga creada correctamente', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .catch((error) => {
      console.error('Error al crear la carga', error);
      toast.error('Error al crear la carga', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }; // Cierra la función handleSubmit

  return (
    <div className="home text-center">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/home">Sistema de Stock</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          {/* Aquí puedes agregar los enlaces de los botones y el botón de logout */}
        </Navbar.Collapse>
      </Navbar>
      <div className="container d-flex justify-content-center align-items-center carga-container">
        <div className="card p-4 carga-card">
          <h1 className="text-center mb-4">Crear Carga</h1>
          <form onSubmit={handleSubmit}>
            {/* ...otros campos de formulario existentes... */}
            {/* Campos uno debajo del otro */}
            <div className="d-flex flex-column">
              <label>
                Toner:
                <CustomSelect
                  options={toners}
                  value={cargaData.idToner}
                  onChange={(id) => setCargaData({ ...cargaData, idToner: id })}
                />
              </label>
              <label>
                Servicio:
                <CustomSelect
                  options={services}
                  value={cargaData.idService}
                  onChange={(id) => setCargaData({ ...cargaData, idService: id })}
                />
              </label>
            </div>
            <label>
              Cantidad:
              <input
                type="number"
                value={cargaData.cant}
                onChange={(e) => setCargaData({ ...cargaData, cant: parseInt(e.target.value, 10) })}
              />
            </label>
            {/* ...otros campos de formulario existentes... */}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">Aceptar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Carga;