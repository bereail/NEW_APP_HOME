import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavbarCustom = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Sistema de Stock</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav" className="justify-content-end">
                <Nav>
                    <Nav.Link as={Link} to="/carga">Nueva Carga</Nav.Link>
                    <Nav.Link as={Link} to="/tonerput">Lista Toner</Nav.Link>
                    <Nav.Link as={Link} to="/nuevoPedido">Nuevo Pedido</Nav.Link>
                    <Nav.Link as={Link} to="/listaPedidos">Lista Pedidos</Nav.Link>
                    {/* Agrega aquí el botón de logout si es necesario */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarCustom;
