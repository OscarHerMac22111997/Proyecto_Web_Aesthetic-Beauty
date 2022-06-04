import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';


import { Container, NavItem } from "reactstrap";

const LoginNavBar = () => {
    return (
        <Fragment style ={{fontFamily: 'Arial'}}>
            <Navbar
                style={{ backgroundColor: "rgba(0,0,0,0.0)" }}
                variant="dark"
                collapseOnSelect
                expand="lg"
            >
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="../images/logoColorCut.png"
                            width="200"
                            height="50"
                        />{" "}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};
export default LoginNavBar;

if (document.getElementById("loginnavbar")) {
    ReactDOM.render(<LoginNavBar />, document.getElementById("loginnavbar"));
}
