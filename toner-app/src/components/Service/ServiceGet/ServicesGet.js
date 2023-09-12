import React, { useEffect, useState } from "react";
import "./ServicesGet.css";

const ServicesGet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //Realizar la solicitud GET de Service a la API
    fetch("https://localhost:7293/api/Service/service")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {data.map(item => (
            <li key={item.id}>
                Servicio: {item.name}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesGet;


