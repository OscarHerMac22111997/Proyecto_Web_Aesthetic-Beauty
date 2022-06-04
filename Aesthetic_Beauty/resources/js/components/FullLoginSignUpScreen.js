import React, { Component, Fragment } from "react";
import { Route, NavLink, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import ReactDOM from "react-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import "./App.css";

class FullLoginSignUpScreen extends Component {
    render() {
        return (
            <div>
                
                    <div className="App">
                        <div className="appAside">
                            <Fragment>
                                <Navbar
                                    style={{
                                        backgroundColor: "rgba(0,0,0,1.0)",
                                    }}
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
                                            
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                            </Fragment>
                        </div>

                        <div className="appForm">
                            <div className="formTitle">
                                <NavLink
                                    to="./Login"
                                    activeclassname="formTitleLink-active"
                                    className="formTitleLink"
                                >
                                    Login
                                </NavLink>{" "}
                                or{" "}
                                <NavLink
                                    
                                    to="./SignUp"
                                    activeclassname="formTitleLink-active"
                                    className="formTitleLink"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                            <Routes>
                                <Route path="/Login" element={<Login/>} />
                                <Route path="/SignUp" element={<SignUp/>} />
                            </Routes>
                            
                        </div>
                    </div>
            </div>
        );
    }
}

export default FullLoginSignUpScreen;

if (document.getElementById("fullloginsignupscreen")) {
    ReactDOM.render(
        <FullLoginSignUpScreen />,
        document.getElementById("fullloginsignupscreen")
    );
}
