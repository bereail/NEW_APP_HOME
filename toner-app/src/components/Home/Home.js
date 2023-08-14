import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar hoja de estilos de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min"; // Importar scripts de Bootstrap
import { Navbar } from "react-bootstrap";

const Home = () => {
    return (
        <div className="home text-center">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/home">Sistema de Stock</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav" className="justify-content-end">
                    {/* Aquí puedes agregar los enlaces de los botones y el botón de logout */}
                </Navbar.Collapse>
            </Navbar>
            <h1>Sistema de Stock</h1>
            <div className="d-flex justify-content-center align-items-center">
                <div className="btn-group me-4">
                    <button type="button" className="btn btn-dark">Toner</button>
                    <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link to="/carga" className="dropdown-item">Nueva Carga</Link></li>
                        <li><Link to="/tonerList" className="dropdown-item">Lista Toner</Link></li>
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
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;
