import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const TonerPUT = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toner, setToner] = useState({});
  const [formData, setFormData] = useState({ name: '', cant: 0 });

  useEffect(() => {
    // Realizar la solicitud GET a la API para obtener los detalles del toner a editar
    fetch(`https://localhost:7293/api/TonerStore/toners/${id}`)
      .then(response => {
        console.log('Response:', response);
        return response.json();
      })
      .then(data => {
        setToner(data);
        setFormData({ name: data.name, cant: data.cant });
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditToner = () => {
    // Realizar la solicitud PUT a la API para editar el toner
    fetch(`https://localhost:7293/api/TonerStore/toners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        console.log('Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Toner edit successful:', data);
        toast.success('Toner actualizado');
        // Redirigir a la lista de toners después de editar
        navigate('/tonerPages');
      })
      .catch(error => {
        console.error('Error editing toner:', error);
        toast.error('Error al editar el toner'); // Notificación de error
      });
  };
  
  return (
    <div>
       <Link to="/tonerPages"> {/* Ruta a la página "TonerPages" */}
        <h2>Editar Toner</h2>
      </Link>
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      <input type="number" name="cant" value={formData.cant} onChange={handleInputChange} />
      <button onClick={handleEditToner}>Guardar</button>
      <ToastContainer />
    </div>
  );
};

export default TonerPUT;
