import React, { useEffect, useState } from 'react';

const TonerPOST = () => {
    const [data, setData] = useState([]);
    const [newToner, setNewToner] = useState({
      name: '',
      cant: 0
    });
  
    useEffect(() => {
      // Realizar la solicitud GET a la API
      fetch('https://localhost:7293/api/TonerStore/toners')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error));
    }, []);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewToner({
        ...newToner,
        [name]: value
      });
    };
  
    const showNotification = (message, type) => {
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(message, {
              body: type === 'success' ? 'Toner agregado exitosamente' : 'Error al agregar el toner'
            });
          }
        });
      }
    };
  
    const handleSubmit = () => {
        // Realizar la solicitud POST a la API
        fetch('https://localhost:7293/api/TonerStore/toners', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newToner)
        })
          .then(response => response.json())
          .then(data => {
            // Actualizar el estado con el nuevo toner agregado
            setData([...data, data]);
            // Reiniciar el estado del formulario
            setNewToner({
              name: '',
              cant: 0
            });
            // Mostrar notificación de éxito
            alert('Toner agregado exitosamente', 'success');
          })
          .catch(error => {
            console.error('Error:', error);
            // Mostrar notificación de error
            alert('Error al agregar el toner', 'error');
          });
      };
  
    return (
      <div>
        <h1>Frontend de React consumiendo una API en C#</h1>
        <ul>
          {data.map(item => (
            <li key={item.id}>
              ID: {item.id}, Nombre: {item.name}, Cantidad: {item.cant}
            </li>
          ))}
        </ul>
        <div>
          <h2>Agregar nuevo toner</h2>
          <input type="text" name="name" value={newToner.name} onChange={handleInputChange} />
          <input type="number" name="cant" value={newToner.cant} onChange={handleInputChange} />
          <button onClick={handleSubmit}>Agregar</button>
        </div>
      </div>
    );
  };

export default TonerPOST;
