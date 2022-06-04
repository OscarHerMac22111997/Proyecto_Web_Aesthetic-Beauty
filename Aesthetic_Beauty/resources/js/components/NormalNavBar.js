import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';


import { Container, NavItem } from "reactstrap";

const NormalNavBar = () => {
    return (
        <Fragment>
            <Navbar
                style={{ backgroundColor: "rgba(0,0,0,1.0)" }}
                variant="dark"
                collapseOnSelect
                expand="lg"
            >
                <Container>
                    <Navbar.Brand href="./">
                        <img
                            alt=""
                            src="./images/logoColorCut.png"
                            width="200"
                            height="50"
                        />{" "}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                            
                        </Nav>
                        <Nav>
                            <Nav.Link href="#/LogIn/SignUp">Sign Up</Nav.Link>
                            <Nav.Link href="#/LogIn/Login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};
export default NormalNavBar;

if (document.getElementById("normalnavbar")) {
    ReactDOM.render(<NormalNavBar />, document.getElementById("normalnavbar"));
}
