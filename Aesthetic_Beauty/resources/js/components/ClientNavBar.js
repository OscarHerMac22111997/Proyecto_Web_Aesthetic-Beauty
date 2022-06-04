import React, { Fragment } from "react";

import "./app.css";
import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { FaCalendar, FaPlus,FaEdit, FaComment,FaRegWindowRestore, FaDoorOpen } from "react-icons/fa";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function ClientNavBar(){
    const navigate = useNavigate();
    const endSession = () =>{
        localStorage.setItem('auth_token', '');
        localStorage.setItem('email', '')
        navigate('/');
    }

    return (
        <div style = {{backgroundColor: 'white', color: '#FFF', width: 200, height: '100%'}}>
            <Navigation
                
                activeItemId="/ClientPanel/"
                onSelect={({itemId}) => {
                    (itemId!="logout") ?
                     navigate(itemId) : endSession()
                }}
                items={[
                {
                    title: 'Dashboard',
                    itemId: '/ClientPanel',
                    elemBefore: () => <FaRegWindowRestore style={{color: 'black'}}/>,
                },
                {
                    title: 'Dates',
                    elemBefore: () => <FaCalendar/>,
                    subNav: [
                    {
                        title: 'Add date',
                        itemId: '/ClientPanel/clientDates/add',
                        elemBefore: () => <FaPlus/>,
                    },
                    {
                        title: 'Manage dates',
                        itemId: '/ClientPanel/clientDates/manage',
                        elemBefore: () => <FaEdit/>,
                    },
                    ],
                },
                {
                    title: 'Log Out',
                    itemId: 'logout',elemBefore: () => <FaDoorOpen/>,
                },
                ]}
            /> 

        </div>
            
                
    );
}

export default ClientNavBar;

if (document.getElementById("clientnavbar")) {
    ReactDOM.render(<ClientNavBar />, document.getElementById("clientnavbar"));
}