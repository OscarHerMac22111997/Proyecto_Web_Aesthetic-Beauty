import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-bootstrap/Carousel";
import "./app.css";
import { HashRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import FullLoginSignUpScreen from "./FullLoginSignUpScreen";
import ClientPanel from "./ClientPanel";
import Adminpanel from './Adminpanel';
import StylistPanel from './StylistPanel';

function Example() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route index element={<Welcome/>} />
                    <Route path="/Login/*" element={<FullLoginSignUpScreen/>} />
                    <Route path="/ClientPanel/*" element={<ClientPanel/>} />
                    <Route path="/AdminPanel/*" element={<Adminpanel/>} />
                    <Route path="/StylistPanel/*" element={<StylistPanel/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}