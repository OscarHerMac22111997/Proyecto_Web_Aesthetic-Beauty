import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

import EditServices from "./EditServices";
import AdminServices from "./AdminServices";
import AdminGeneral from "./AdminGeneral";
import CreateServices from "./CreateServices";

import AdminStyles from "./AdminStyles";
import CreateStyles from "./CreateStyles";
import EditStyles from "./EditStyles";

import AdminShops from './AdminShops';
import CreateShops from './CreateShops';
import EditShops from './EditShops';

import AdminStylists from './AdminStylists';
import CreateStylists from './CreateStylists';
import EditStylists from './EditStylists';

import AdminColors from './AdminColors';
import CreateColors from './CreateColors';
import EditColors from './EditColors';

import "./app.css";
import { Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";


class Adminpanel extends React.Component {
    
    render()
    
     {
        return (
            <div>
                <div>
                    <Fragment>
                        <Navbar
                            style={{ backgroundColor: "rgba(0,0,0,1.0)" }}
                            variant="dark"
                            collapseOnSelect
                            expand="lg"
                        >
                            <Container>
                                <Navbar.Brand href="#/AdminPanel/services">
                                    Administrador
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="#/AdminPanel/services">
                                            Services
                                        </Nav.Link>
                                        <Nav.Link href="#/AdminPanel/styles">
                                            Styles
                                        </Nav.Link>
                                        <Nav.Link href="#/AdminPanel/colors">
                                            Colors
                                        </Nav.Link>
                                        <Nav.Link href="#/AdminPanel/shops">
                                            Shops
                                        </Nav.Link>
                                        <Nav.Link href="#/AdminPanel/stylists">
                                            Stylists
                                        </Nav.Link>

                                    </Nav>
                                    <Nav>
                                      
                        <Nav.Link href="/">Log Out</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </Fragment>
                </div>
                <div >
                    <Routes>
                        <Route
                            path="/services/create"
                            element={<CreateServices />}
                        />
                        <Route
                            path="/services/edit/:id"
                            element={<EditServices />}
                        />
                        <Route
                            index
                            path="/admingeneral"
                            element={<AdminGeneral />}
                        />
                        <Route
                            path="/services"
                            element={<AdminServices />}
                        />

                        <Route
                            path="/styles"
                            element={<AdminStyles />}
                        />
                        
                            <Route
                            path="/styles/create"
                            element={<CreateStyles />}
                        />
                                                        <Route
                            path="/styles/edit/:id"
                            element={<EditStyles />}
                        />
                        <Route
                            path="/shops"
                            element={<AdminShops />}
                        />
                            <Route
                            path="/shops/create"
                            element={<CreateShops />}
                        />
                        <Route
                            path="/shops/edit/:id"
                            element={<EditShops />}
                        />
                        <Route
                            path="/stylists"
                            element={<AdminStylists />}
                        />
                            <Route
                            path="/stylists/create"
                            element={<CreateStylists />}
                        />
                        <Route
                            path="/stylists/edit/:id"
                            element={<EditStylists />}
                        />
                        <Route
                            path="/colors"
                            element={<AdminColors />}
                        />
                            <Route
                            path="/colors/create"
                            element={<CreateColors />}
                        />
                        <Route
                            path="/colors/edit/:id"
                            element={<EditColors />}
                        />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Adminpanel;

if (document.getElementById("adminpanel")) {
    ReactDOM.render(<Adminpanel />, document.getElementById("adminpanel"));
}
