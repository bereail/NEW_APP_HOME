import React, { useEffect, useState } from 'react';

const UserGet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a la API
    fetch('https://localhost:7293/api/Users/users')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map(user => (
          <li key={user.id}>
            ID: {user.id}, Name: {user.name}, Password: {user.pass}, Role ID: {user.idRol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserGet;
