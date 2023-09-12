import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Home = () => {
    return (
        <div className="home text-center">
            <div className="center-container">
                <h1>Sistema</h1>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="btn-group me-4">
                        <button type="button" className="btn btn-dark">Toner</button>
                        <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to="/carga" className="dropdown-item">Nueva Carga</Link></li>
                            <li><Link to="/tonerPut" className="dropdown-item">Lista Toner</Link></li>
                            <li><Link to="/task" className="dropdown-item">Tareas</Link></li>
                        </ul>
                    </div>

                    <div className="btn-group">
                        <button type="button" className="btn btn-dark">Pedidos</button>
                        <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to="/nuevoPedido" className="dropdown-item">Nuevo Pedido</Link></li>
                            <li><Link to="/listaPedidos" className="dropdown-item">Lista Pedidos</Link></li>
                            <li><Link to="/task" className="dropdown-item">Nueva Tarea</Link></li>
                        </ul>
                    </div>
                </div>
                {/* Agregar el nuevo botón para tareas */}
                <div className="mt-4">
                    <Link to="/task" className="btn btn-dark">Tareas</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
