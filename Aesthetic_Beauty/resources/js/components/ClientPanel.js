import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import "./app.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import ClientNavBar from './ClientNavBar';
import ClientDashboard from './ClientDashboard';
import CreateDate from "./CreateDate";
import AdminDates from './AdminDates';
class ClientPanel extends React.Component {
    render() {
        return (
            <div  style={{display: 'flex'}}>
                <span>
                    <Fragment>
                        <ClientNavBar/>
                    </Fragment>
                </span>
                <span style={{width: '100%'}}>
                    <Routes>
                        <Route
                            index
                            element={<ClientDashboard />}
                        />
                        <Route
                            path='/clientDates/add/'
                            element={<CreateDate />}
                        />
                        <Route
                            path='/clientDates/manage/'
                            element={<AdminDates />}
                        />
                    </Routes>
                </span>
            </div>
        );
    }
}

export default ClientPanel;

if (document.getElementById("clientpanel")) {
    ReactDOM.render(<ClientPanel />, document.getElementById("clientpanel"));
}
