import React, { Fragment } from "react";

import "./app.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { FaCalendar, FaPlus,FaEdit, FaComment,FaRegWindowRestore, FaDoorOpen } from "react-icons/fa";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function StylistNavBar(){
    const navigate = useNavigate();
    const endSession = () =>{
        localStorage.setItem('auth_token', '');
        localStorage.setItem('email', '')
        navigate('/');
    }
    return (
        <div style = {{backgroundColor: '#FFF', color: '#000', width: 200, height: '100%'}}>
            <Navigation
                
                activeItemId="/StylistPanel/"
                onSelect={({itemId}) => {
                    (itemId!="logout") ?
                     navigate(itemId) : endSession()
                }}
                items={[
                {
                    title: 'Dashboard',
                    itemId: '/StylistPanel/',
                    elemBefore: () => <FaRegWindowRestore style={{color: 'black'}}/>,
                },
                {
                    title: 'Manage Dates',
                    itemId: '/StylistPanel/clientDates',
                    elemBefore: () => <FaEdit/>,
                },
                {
                    title: 'My Reviews',
                    itemId: '/StylistPanel/reviews',
                    elemBefore: () => <FaComment/>,
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

export default StylistNavBar;

if (document.getElementById("stylistnavbar")) {
    ReactDOM.render(<StylistNavBar />, document.getElementById("stylistnavbar"));
}