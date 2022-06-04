import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';


import { Container, NavItem } from "reactstrap";

const AdminNavBar = () => {
    return (
        <Fragment style ={{fontFamily: 'Arial'}}>
            <Navbar
                style={{ backgroundColor: "rgba(0,0,0,1.0)" }}
                variant="dark"
                collapseOnSelect
                expand="lg"
            >
                <Container>
                    <Navbar.Brand href="/adminpanel">
                        Administrador
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                            <Nav.Link href="adminpanel/services">Services</Nav.Link>
                            <Nav.Link href="/workers">Workers</Nav.Link>
                            <Nav.Link href="/contact">Clients</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};
export default AdminNavBar;

if (document.getElementById("admkinnavbar")) {
    ReactDOM.render(<AdminNavBar />, document.getElementById("admkinnavbar"));
}
