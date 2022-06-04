import React, { Fragment } from "react";
import "./app.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";

import StylistNavBar from './StylistNavBar';
import StylistDashboard from './StylistDashboard';
import StylistAdminDates from './StylistAdminDates';
import CreateDate from "./CreateDate";

import Reviews from './Reviews';

class StylistPanel extends React.Component {
    render() {
        return (
            <div  style={{display: 'flex'}}>
                <span>
                    <Fragment>
                        <StylistNavBar/>
                    </Fragment>
                </span>
                <span style={{width: '100%'}}>
                    <Routes>
                        <Route
                            index
                            element={<StylistDashboard/>}
                        />
                        <Route
                            path='/clientDates'
                            element={<StylistAdminDates/>}
                        />
                        <Route
                            path='/reviews'
                            element={<Reviews/>}
                        />
                    </Routes>
                </span>
            </div>
        );
    }
}

export default StylistPanel;

if (document.getElementById("stylistpanel")) {
    ReactDOM.render(<StylistPanel />, document.getElementById("stylistpanel"));
}
